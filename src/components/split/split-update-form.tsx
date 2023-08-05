"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Split } from "@/types/split"
import { getBucketPath } from "@/lib/bucket-path"
import { muscle_target } from "@/lib/muscle-target"
import { splitSchema } from "@/lib/validations/split"
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

import { Checkbox } from "../ui/checkbox"

type FormData = z.infer<typeof splitSchema>

interface Props {
  split: Split
  setOpen: (open: boolean) => void
}

export function SplitUpdateForm({ split, setOpen }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(splitSchema),
    defaultValues: {
      name: split.name?.toString() || "",
      user_id: split.user_id,
      split_group_id: split.split_group_id,
      muscle_targets: split.muscle_targets || [],
    },
  })

  async function onSubmit(data: FormData) {
    try {
      const { error } = await supabaseClient
        .from("split")
        .update([
          {
            name: data.name,
            user_id: split.user_id,
            split_group_id: split.split_group_id,
            muscle_targets: data.muscle_targets,
          },
        ])
        .eq("id", split.id)
        .select()

      if (error) {
        console.log(error)
        throw error
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Split Name</FormLabel>
              <FormControl>
                <Input placeholder="Push Day..." type="text" {...field} />
              </FormControl>
              <FormDescription>Enter the split name here.</FormDescription>
              {form.formState.errors.name && (
                <FormMessage>{form.formState.errors.name.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="muscle_targets"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Muscle Target</FormLabel>
                <FormDescription>
                  Select the muscles that align with your split
                </FormDescription>
              </div>
              {muscle_target.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="muscle_targets"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
