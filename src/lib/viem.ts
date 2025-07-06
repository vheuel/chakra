import { Chain } from "wagmi";
import { createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const monadTestnet: Chain = {
  id: 10143,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.monad.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "MonadScan", url: "https://explorer.monad.xyz" },
  },
  testnet: true,
};

export const client = createClient({
  autoConnect: true,
  provider: jsonRpcProvider({
    rpc: () => ({ http: monadTestnet.rpcUrls.default.http[0] }),
  }).provider,
});