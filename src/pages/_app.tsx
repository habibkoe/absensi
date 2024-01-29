import "@/styles/globals.css";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const queryClient = new QueryClient();

  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </SessionProvider>
    );
  }
}
