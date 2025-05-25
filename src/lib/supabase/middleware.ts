
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/lib/supabase/database.types'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return request.cookies.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          // If the cookie is set, update the request cookies and response.
          // This ensures that the next middleware or page route has the updated cookie.
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        async remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request cookies and response.
          // This ensures that the next middleware or page route has the updated cookie.
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // This will refresh the session if expired and update the cookies.
  await supabase.auth.getSession()

  return response
}
