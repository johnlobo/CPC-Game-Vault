
'use client'

import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter() // Keep useRouter for other potential uses, though not for this specific redirect
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Use window.location.href for a full page navigation
        // This can sometimes be more robust in environments with tricky cookie/session propagation
        window.location.href = redirectTo;
      }
    })

    // Check if user is already logged in
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // Use window.location.href here as well for consistency
        window.location.href = redirectTo;
      }
    }
    checkSession()

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase, redirectTo]) // Removed router from dependency array as it's not directly used for the redirect anymore

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Admin Access</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Sign in to manage the CPC Game Vault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']} // Add or remove providers as needed
            redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Password',
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
