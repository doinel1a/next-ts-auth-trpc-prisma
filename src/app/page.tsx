import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/server/auth';
import { api } from '@/server/trpc';

const Counter = dynamic(() => import('@/components/counter'), {
  loading: () => <Skeleton className='h-44 w-72 rounded-md' />
});

export default async function HomePage() {
  const session = await auth();
  const post = await api.v1.post.getLatest();

  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-y-5'>
      {session && <h1 className='text-3xl font-semibold'>Welcome back, {session.user.name}</h1>}
      {post && <h2 className='text-xl'>Latest post: {post.name}</h2>}
      <Counter />
      <Button variant={session ? 'destructive' : 'default'} asChild>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </Button>
    </main>
  );
}
