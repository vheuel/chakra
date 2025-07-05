import { WagmiConfig } from 'wagmi';
import { config } from '@/lib/viem'; // Konfigurasi jaringan Monad
import { PrivyProvider } from '@privy-io/react-auth';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const PRIVY_APP_ID = 'cmcqee3i700adic0nsfam1rdb';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <PrivyProvider
        appId={PRIVY_APP_ID}
        config={{
          appearance: {
            theme: 'dark',
          },
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </WagmiConfig>
  );
}
