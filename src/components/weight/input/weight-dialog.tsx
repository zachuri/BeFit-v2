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

  const [uploading, setUploading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight: "0",
      description: "",
      weight_url: null, // Initialize weight_url as null
      user_id: user_id,
    },
  })

  async function onSubmit(data: FormData) {
    let url

    try {
      setUploading(true)

      // Check if weight_url is present
      if (data.weight_url) {
        // Upload the file to the "progress" bucket
        const file = data.weight_url[0]
        const filePath = `${user_id}/${file.name}`

        const { data: uploadData, error: uploadError } =
          await supabaseClient.storage.from("progress").upload(filePath, file)

        if (uploadError) {
          throw uploadError
        }

        // Get the public URL of the uploaded file
        const { data: progress_url } = await supabaseClient.storage
          .from("progress")
          .getPublicUrl(filePath)

        // Set the weight_url value to the public URL
        url = progress_url.publicUrl
      }

      // Insert the form data into the "weight" table
      const { data: response, error } = await supabaseClient
        .from("weight")
        .insert([
          {
            weight: parseFloat(data.weight),
            description: data.description,
            weight_url: url,
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
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to upload the image.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
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
                  <Input
                    type="file"
                    accept="image/*"
                    // Instead of using spread use on change
                    onChange={(event) => {
                      const file = event.target.files
                      if (file && file.length > 0) {
                        form.setValue("weight_url", file)
                      }
                    }}
                    // {...field}
                  />
                </FormControl>
                <FormDescription>Enter the weight URL here.</FormDescription>
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
