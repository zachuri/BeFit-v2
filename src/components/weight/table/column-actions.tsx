"use client"

import React, { forwardRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { RowData } from "@tanstack/react-table"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Weight } from "@/types/weight"
import { getBucketPath } from "@/lib/bucket-path"
import { weightSchema } from "@/lib/validations/weight"
import { useUser } from "@/hooks/useUser"
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

export function DeleteDialog({
  id,
  weight_url,
}: {
  id: string
  weight_url: string
}) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  // Stops the dialog from clsoing
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Prevents the default behavior of the button click
    setOpen(true) // Opens the delete dialog
  }

  async function handleDelete() {
    // delete image first
    if (weight_url.length !== 0) {
      const { userId, fileName } = getBucketPath(weight_url, "progress")

      const { data: deleteImage, error: errorDeleteImage } =
        await supabaseClient.storage
          .from("progress")
          .remove([`${userId}/${fileName}`])

      if (errorDeleteImage) {
        return toast({
          title: "Something went wrong.",
          description: "No able to delete image",
          variant: "destructive",
        })
      }
    }

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

  const [imageUrl, setImageUrl] = useState("")

  const user = useUser()

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
              <FormDescription>
                {field.value}
                <Image
                  src={field.value}
                  alt={field.value}
                  height={10}
                  width={10}
                />
              </FormDescription>
              {/* <FormDescription>Enter the weight URL here.</FormDescription>
              {form.formState.errors.weight && (
                <FormMessage>
                  {form.formState.errors.weight_url?.message}
                </FormMessage>
              )} */}
            </FormItem>
          )}
        />

        {user.subscription?.status === "active" ? (
          <FormField
            control={form.control}
            name="weight_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload new Image?</FormLabel>
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
                <FormDescription>
                  Replace current image with a new image?
                </FormDescription>
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
