'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-primary">Buddies</span>
          </h2>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="px-8 py-6 text-lg rounded-lg">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="px-8 py-6 text-lg rounded-lg">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 