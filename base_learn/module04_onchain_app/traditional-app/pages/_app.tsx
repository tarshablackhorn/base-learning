import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const ENABLED = Boolean(projectId);

const config = ENABLED
  ? getDefaultConfig({
      appName: 'Base Learn – Wallet Connect (Pages)',
      projectId,
      chains: [baseSepolia],
      ssr: true,
    })
  : undefined as any;

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  if (!ENABLED) {
    if (typeof window !== 'undefined') {
      console.warn('Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local and restart.');
    }
    return <Component {...pageProps} />;
  }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
