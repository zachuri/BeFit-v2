export function formatCreatedAt(time_stamp: string | Date | unknown) {
  let timestampDate: Date

  if (typeof time_stamp === "string" || typeof time_stamp === "number") {
    timestampDate = new Date(time_stamp)
  } else if (time_stamp instanceof Date) {
    timestampDate = time_stamp
  } else {
    console.error("Invalid timestamp value")
    // Return a default value or handle the error case
    return { time: "", date: "" }
  }

  const options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  const formattedTime = timestampDate.toLocaleTimeString(undefined, options)
  const formattedDate = timestampDate.toLocaleDateString(undefined, options)

  return { time: formattedTime, date: formattedDate }
}