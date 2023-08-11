export const fetchSupabase = ({
  query = "",
  cache = "force-cache" as RequestCache,
  headers = {},
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${query}`, {
    headers: {
      ...headers,
      apikey: process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY || "",
    },
    cache,
  })
}
