"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { WorkoutSets } from "@/types/workout_sets"
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
  set: WorkoutSets
  setOpen: (open: boolean) => void
}

export default function SetUpdateForm({ set, setOpen }: Props) {
  const { supabaseClient } = useSessionContext()

  const router = useRouter()
  const user = useUser()

  const form = useForm<FormData>({
    resolver: zodResolver(setSchema),
    defaultValues: {
      exercise_id: set.exercise_id || "",
      reps: set.reps || 0,
      weight: set.weight || 0,
    },
  })

  async function onSubmit(data: FormData) {
    // need to implement
    try {
      const { error } = await supabaseClient
        .from("workout_sets")
        .update([
          {
            exercise_id: data.exercise_id,
            weight: data.weight,
            reps: data.reps,
          },
        ])
        .eq("id", set.id)
        .eq("user_id", user.user?.id)
        .select()

      if (error) {
        throw error
      }

      toast({
        description: "Your changes have been updated.",
      })

      router.refresh()
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to add split",
        variant: "destructive",
      })
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
                <Input
                  placeholder="189"
                  type="number"
                  step={0.1}
                  {...field}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
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
                <Input
                  type="number"
                  step={1}
                  {...field}
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
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
