"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

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

interface TableFormProps {
  user_id: string
  setOpen: (open: boolean) => void
}

export function WeightForm({ user_id, setOpen }: TableFormProps) {
  const { supabaseClient } = useSessionContext()

  const [uploading, setUploading] = useState(false)

  const router = useRouter()
  const user = useUser()

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
    let uploaded_url

    try {
      setUploading(true)

      // If user input file, upload to bucket
      if (data.weight_url) {
        // Upload the file to the "progress" bucket
        //  - create uuid for filename
        //  - filepath -> user_id/randomuuid.[file type]
        const file = data.weight_url[0]
        const fileName = file.name
        const fileNameUUID = uuidv4() 
        const fileType = fileName.split(".").pop() as string
        const filePath = `${user_id}/${fileNameUUID}.${fileType}`

        const { error: uploadError } = await supabaseClient.storage
          .from("progress")
          .upload(filePath, file)

        if (uploadError) {
          throw uploadError
        }

        // Get the public URL of the uploaded file
        // Set the weight_url value to the obtain uploaded_Url
        const { data: getPublicUrl } = await supabaseClient.storage
          .from("progress")
          .getPublicUrl(filePath)

        uploaded_url = getPublicUrl.publicUrl
      }

      // Insert the form data into the "weight" table
      const { error: insertError } = await supabaseClient
        .from("weight")
        .insert([
          {
            weight: parseFloat(data.weight),
            description: data.description,
            weight_url: uploaded_url,
            user_id: user_id,
          },
        ])
        .select()

      if (insertError) {
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
                    // Instead of using spread use onChange
                    // {...field}
                    onChange={(event) => {
                      const file = event.target.files
                      if (file && file.length > 0) {
                        form.setValue("weight_url", file)
                      }
                    }}
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

        <Button disabled={uploading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
