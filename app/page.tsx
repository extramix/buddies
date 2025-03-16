import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import LandingPage from '@/components/LandingPage';

export default async function Home() {
  const cookieStore = await cookies();
  const hasSessionCookie = cookieStore.has('sessionid');
  
  if (hasSessionCookie) {
    redirect('/dashboard');
  }
  
  return <LandingPage />;
}
