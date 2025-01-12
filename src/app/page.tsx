import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/server/auth';

const Counter = dynamic(() => import('@/components/counter'), {
  loading: () => <Skeleton className='h-44 w-72 rounded-md' />
});

export default async function Home() {
  const session = await auth();

  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
      {session && <h1 className='text-3xl font-semibold'>Welcome back, {session.user.name}</h1>}
      <Counter />
      <Button variant={session ? 'destructive' : 'default'} asChild>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </Button>
    </main>
  );
}
