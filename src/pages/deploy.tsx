/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import { createPublicClient, createWalletClient, http } from "viem";
import { monadTestnet } from "@/lib/viem";
import abi from "@/abi/BackerMint.abi.json";
import bytecodeRaw from "@/abi/BackerMint.bytecode.txt";

export default function DeployPage() {
  const { wallets } = useWallets();
  const wallet = wallets[0];
  const [status, setStatus] = useState("Not deployed");

  const bytecode = `0x${bytecodeRaw.trim()}`;

  const deployContract = async () => {
    if (!wallet) {
      setStatus("❌ Wallet not connected");
      return;
    }

    try {
      setStatus("⏳ Deploying...");

      const signer = await wallet.getEthereumSigner();
      const address = await signer.getAddress();

      const walletClient = createWalletClient({
        account: address,
        chain: monadTestnet,
        transport: http(),
      });

      const hash = await walletClient.deployContract({
        abi,
        bytecode,
      });

      setStatus(`✅ Contract deployed! TX: ${hash}`);
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Error: ${error.message || "Deploy failed"}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Deploy BackerMint Contract</h1>
      <button
        onClick={deployContract}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded"
      >
        Deploy
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
