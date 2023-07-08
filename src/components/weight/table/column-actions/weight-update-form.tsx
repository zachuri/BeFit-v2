"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Weight } from "@/types/weight"
import { getBucketPath } from "@/lib/bucket-path"
import { weightSchema } from "@/lib/validations/weight"
import { useUser } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
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

interface WeightUpdateFormProps {
  weight: Weight
  setOpen: (open: boolean) => void
}

export function WeightUpdateForm({ weight, setOpen }: WeightUpdateFormProps) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState("")

  const user = useUser()

  const form = useForm<FormData>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight: weight.weight?.toString() || "",
      description: weight.description || "",
      weight_url: null,
      user_id: weight.user_id,
    },
  })

  async function onSubmit(data: FormData) {
    let updated_url

    try {
      if (data.weight_url && weight.weight_url) {
        // Old weight_url path
        const { userId, fileName } = getBucketPath(
          weight.weight_url,
          "progress"
        )

        // New weight_url path
        const file = data.weight_url[0]
        const filePath = `${data.user_id}/${file.name}`

        const { error: updatePhotoError } = await supabaseClient.storage
          .from("progress")
          .update(`${userId}/${fileName}`, file, {
            cacheControl: "3600",
            upsert: true,
          })

        if (updatePhotoError) {
          throw updatePhotoError
        }

        // Get the public URL of the uploaded file
        const { data: progress_url } = await supabaseClient.storage
          .from("progress")
          .getPublicUrl(filePath)

        // Set the weight_url value to the public URL
        updated_url = progress_url.publicUrl
      }

      const { error: updateRowError } = await supabaseClient
        .from("weight")
        .update([
          {
            weight: parseFloat(data.weight),
            description: data.description,
            weight_url: weight.weight_url,
            user_id: weight.user_id,
          },
        ])
        .eq("id", weight.id)
        .select()

      if (updateRowError) {
        throw updateRowError
      }

      toast({
        description: "Your changes have been updated.",
      })

      setOpen(false)

      router.refresh()
    } catch (error) {
      return toast({
        title: "Something went wrong.",
        description: `No update was made`,
        variant: "destructive",
      })
    }
  }

  async function getProtectedImage() {
    const { userId, fileName } = getBucketPath(
      weight.weight_url || "",
      "progress"
    )

    try {
      const { data, error } = await supabaseClient.storage
        .from("progress")
        .createSignedUrl(`${userId}/${fileName}`, 60)

      if (error) {
        throw new Error("Error retrieving signed URL")
      }

      setImageUrl(data?.signedUrl || "")
    } catch (error) {
      console.error("Error retrieving private image URL:", error)
      setImageUrl("") // Set imageUrl to empty in case of an error
    }
  }

  useEffect(() => {
    getProtectedImage()
  }, [weight.weight_url])

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
              <FormLabel>Current Image</FormLabel>
              <FormControl>
                {/* <Input placeholder="for premium users" {...field} /> */}
              </FormControl>
              <FormDescription className="flex items-center justify-center">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={"progress image"}
                    height={200}
                    width={200}
                  />
                )}
              </FormDescription>
            </FormItem>
          )}
        />

        {user.subscription?.status === "active" ? (
          <FormField
            control={form.control}
            name="weight_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload New</FormLabel>
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
