"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import * as z from "zod"

import { setSchema } from "@/lib/validations/set"
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

type FormData = z.infer<typeof setSchema>

interface Props {
  exercise_id: string
  // user_id: string
  setOpen: (open: boolean) => void
}

export default function SetAddForm({ exercise_id, setOpen }: Props) {
  const router = useRouter()
  const user = useUser()

  const form = useForm<FormData>({
    resolver: zodResolver(setSchema),
    defaultValues: {
      exercise_id: exercise_id,
      reps: 0,
      weight: 0,
      user_id: user.user?.id,
    },
  })

  function onSubmit() {
    // need to implement
    return
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
              <FormDescription>Enter weight used</FormDescription>
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
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps</FormLabel>
              <FormControl>
                <Input type="number" step={1} {...field} />
              </FormControl>
              <FormDescription>Enter Total Reps</FormDescription>
              {form.formState.errors.weight && (
                <FormMessage>{form.formState.errors.reps?.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* <Button disabled={uploading} type="submit"> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
