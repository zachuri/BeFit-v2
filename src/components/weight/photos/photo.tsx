import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useSessionContext } from "@supabase/auth-helpers-react"

import { Weight } from "@/types/weight"
import { getBucketPath } from "@/lib/bucket-path"
import { formatCreatedAt } from "@/lib/format-date"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

interface Props {
  weight: Weight
}

export default function WeightPhoto({ weight }: Props) {
  const { supabaseClient } = useSessionContext()
  const [imageData, setImageData] = useState<string | null>(null)

  async function getProtectedImage(weightUrl: string) {
    const { userId, fileName } = getBucketPath(weightUrl || "", "progress")

    try {
      const cacheKey = `image_${userId}_${fileName}`
      const cachedImageData = localStorage.getItem(cacheKey)

      if (cachedImageData) {
        setImageData(cachedImageData)
        return
      }

      const { data, error } = await supabaseClient.storage
        .from("progress")
        .createSignedUrl(`${userId}/${fileName}`, 60)

      if (error) {
        throw new Error("Error retrieving signed URL")
      }

      const response = await fetch(data?.signedUrl)
      const imageData = await response.blob()
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64data = reader.result as string
        setImageData(base64data)
        localStorage.setItem(cacheKey, base64data) // Cache the image data
      }

      reader.readAsDataURL(imageData)
    } catch (error) {
      console.error("Error retrieving private image:", error)
      setImageData(null) // Set imageData to null in case of an error
    }
  }

  useEffect(() => {
    getProtectedImage(weight.weight_url ?? "")
  }, [weight.weight_url])

  const { time, date } = formatCreatedAt(weight.created_at)

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {time}, {date}
        </CardDescription>
      </CardHeader>
      {imageData && (
        <CardContent>
          <Image
            src={imageData}
            alt="weight progress"
            height={250}
            width={250}
          />
        </CardContent>
      )}
    </Card>
  )
}
