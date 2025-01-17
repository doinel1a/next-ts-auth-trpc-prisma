import '../styles/globals.css';
import '../styles/globals.scss';

import React from 'react';

import type { Metadata, Viewport } from 'next';

import config from '_config';

import Footer from '@/components/footer';
import GithubCorner from '@/components/github-corner';
import Navbar from '@/components/navbar';
import RootProvider from '@/components/providers/root';

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  icons: '/favicon.svg',
  manifest: '/app.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#000'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <RootProvider>
          <Navbar />
          {children}
          <Footer />

          <GithubCorner
            title='Get started on GitHub'
            url='https://github.com/doinel1a/next-ts-shadcn-ui'
          />
        </RootProvider>
      </body>
    </html>
  );
}
