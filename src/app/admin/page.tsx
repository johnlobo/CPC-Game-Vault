
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
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Construct the redirectTo URL; ensure it's an absolute URL for Supabase redirects if needed,
    // or a path for client-side router. For redirect() from Next.js server component, path is fine.
    const currentPath = '/admin'; // Or dynamically get current path if this page could be elsewhere
    redirect(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
  }

  // If session exists, render the client-side admin content
  // Pass user email for display, or the whole user object if more details are needed.
  return <AdminClientContent userEmail={session.user.email} />;
}
