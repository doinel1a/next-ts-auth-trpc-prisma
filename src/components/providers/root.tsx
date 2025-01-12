import React from 'react';

import type { PropsWithChildren } from 'react';

import { TRPCProvider } from './client/trpc';
import ThemeProvider from './theme';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <ThemeProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </ThemeProvider>
  );
}
