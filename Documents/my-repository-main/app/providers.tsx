"use client";

import * as React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, createStorage, cookieStorage, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

// Configuração do Wagmi utilizando o conector Farcaster Mini App + fallback injected
export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    farcasterMiniApp(), // conector correto para ambiente Farcaster
    injected(),         // fallback para browser normal
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));

  // Removemos o useEffect com sdk.actions.ready().
  // O ready() agora é chamado apenas em app/page.tsx após o init completo.

  return (
    <WagmiProvider config={wagmiConfig as Parameters<typeof WagmiProvider>[0]["config"]}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
