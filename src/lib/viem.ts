import { createConfig, configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Chain } from 'wagmi/chains';

export const monadTestnet: Chain = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
};

export const config = createConfig({
  autoConnect: true,
  publicClient: configureChains(
    [monadTestnet],
    [jsonRpcProvider({ rpc: () => ({ http: monadTestnet.rpcUrls.default.http[0] }) })]
  ).publicClient,
});
