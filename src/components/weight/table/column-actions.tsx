"use client"

import React, { forwardRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { RowData } from "@tanstack/react-table"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Weight } from "@/types/weight"
import { weightSchema } from "@/lib/validations/weight"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
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

export function DeleteDialog({ id }: { id: string }) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // Stops the dialog from clsoing
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevents the default behavior of the button click
    setOpen(true) // Opens the delete dialog
  }

  async function handleDelete() {
    const { data: response, error } = await supabaseClient
      .from("weight")
      .delete()
      .eq("id", id)

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-red-500" onClick={handleClick}>
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            current weight.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface TableFormProps {
  weight: Weight
  setOpen: (open: boolean) => void
}

export function TableForm({ weight, setOpen }: TableFormProps) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight: weight.weight?.toString() || "",
      description: weight.description || "",
      weight_url: weight.weight_url || "",
      user_id: weight.user_id,
    },
  })

  async function onSubmit(data: FormData) {
    const { data: response, error } = await supabaseClient
      .from("weight")
      .update([
        {
          weight: parseFloat(data.weight),
          description: data.description,
          weight_url: data.weight_url,
          user_id: weight.user_id,
        },
      ])
      .eq("id", weight.id)
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
