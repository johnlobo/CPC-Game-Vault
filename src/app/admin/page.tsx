
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminClientContent from './AdminClientContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - CPC Game Vault',
  description: 'Administration area for the CPC Game Vault.',
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error, // It's good practice to check for an error from getUser as well
  } = await supabase.auth.getUser();

  if (error || !user) {
    // Construct the redirectTo URL; ensure it's an absolute URL for Supabase redirects if needed,
    // or a path for client-side router. For redirect() from Next.js server component, path is fine.
    const currentPath = '/admin'; 
    redirect(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
  }

  // If user exists, render the client-side admin content
  // Pass user email for display, or the whole user object if more details are needed.
  return <AdminClientContent userEmail={user.email} />;
}

