"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { Control, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { weightSchema } from "@/lib/validations/weight"
import { useUser } from "@/hooks/useUser"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type FormData = z.infer<typeof weightSchema>

interface TableFormProps {
  user_id: string
  setOpen: (open: boolean) => void
}

export function TableForm({ user_id, setOpen }: TableFormProps) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()
  const user = useUser()

  const form = useForm<FormData>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight: "0",
      description: "",
      weight_url: "",
      user_id: user_id,
    },
  })

  async function onSubmit(data: FormData) {
    const { data: response, error } = await supabaseClient
      .from("weight")
      .insert([
        {
          weight: parseFloat(data.weight),
          description: data.description,
          weight_url: data.weight_url,
          user_id: user_id,
        },
      ])
      .select()

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: "No update was made.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your changes have been updated.",
    })

    setOpen(false)

    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input placeholder="189" type="number" step={0.1} {...field} />
              </FormControl>
              <FormDescription>Enter the weight here.</FormDescription>
              {form.formState.errors.weight && (
                <FormMessage>
                  {form.formState.errors.weight.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="looking good today" {...field} />
              </FormControl>
              <FormDescription>Enter the description here.</FormDescription>
              {form.formState.errors.weight && (
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {user.subscription?.status === "active" ? (
          <FormField
            control={form.control}
            name="weight_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="for premium users" {...field} />
                </FormControl>
                <FormDescription>Enter the weight URL here.</FormDescription>
                {form.formState.errors.weight && (
                  <FormMessage>
                    {form.formState.errors.weight_url?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormDescription>
                Upgrade to{" "}
                <span className="font-medium text-primary underline underline-offset-4">
                  <Link href="/billing">Premium</Link>
                </span>{" "}
                to upload progress images.
              </FormDescription>
            </FormItem>
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export function WeightDialog({ user_id }: { user_id: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={cn(buttonVariants())} onClick={() => setOpen(true)}>
          Add Weight
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add weight</DialogTitle>
          <DialogDescription>
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <TableForm user_id={user_id} setOpen={setOpen} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
