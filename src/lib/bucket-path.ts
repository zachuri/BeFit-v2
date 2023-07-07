export function getBucketPath(url: string, bucket: string) {
  const progressIndex = url.indexOf(bucket)
  const extractedPath = url.substring(progressIndex + bucket.length)
  const sanitizedPath = extractedPath.replace(/^\//, "") // Remove the leading forward slash

  const pathParts = sanitizedPath.split("/")
  const userId = pathParts[0]
  const fileName = pathParts[pathParts.length - 1]

  return {
    userId,
    fileName,
  }
}
