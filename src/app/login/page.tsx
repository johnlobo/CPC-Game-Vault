
'use client'

import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push(redirectTo)
      }
    })

    // Check if user is already logged in
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push(redirectTo)
      }
    }
    checkSession()

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase, router, redirectTo])

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
