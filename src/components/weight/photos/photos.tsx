import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Weight } from "@/types/weight";
import { getBucketPath } from "@/lib/bucket-path";

interface Props {
  weight: Weight;
}

export default function WeightPhoto({ weight }: Props) {
  const { supabaseClient } = useSessionContext();
  const [imageUrl, setImageUrl] = useState("");

  async function getProtectedImage(weightUrl: string) {
    const { userId, fileName } = getBucketPath(weightUrl || "", "progress");

    try {
      const cacheKey = `image_${userId}_${fileName}`;
      const cachedImageData = localStorage.getItem(cacheKey);

      if (cachedImageData) {
        setImageUrl(cachedImageData);
        return;
      }

      const { data, error } = await supabaseClient.storage
        .from("progress")
        .createSignedUrl(`${userId}/${fileName}`, 60);

      if (error) {
        throw new Error("Error retrieving signed URL");
      }

      const response = await fetch(data?.signedUrl);
      const imageData = await response.blob();
      const imageUrl = URL.createObjectURL(imageData);

      setImageUrl(imageUrl);
      localStorage.setItem(cacheKey, imageUrl); // Cache the image data
    } catch (error) {
      console.error("Error retrieving private image:", error);
      setImageUrl(""); // Set imageUrl to empty in case of an error
    }
  }

  useEffect(() => {
    getProtectedImage(weight.weight_url ?? "");
  }, [weight.weight_url]);

  return (
    <>
      {imageUrl && (
        <> 
          <h1>{weight.created_at}</h1>
          <Image src={imageUrl} alt="weight progress" height={100} width={100} />
        </>
      )}
    </>
  );
}