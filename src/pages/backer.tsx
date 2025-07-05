import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useState } from "react";

export default function BackerPage() {
  const { ready, authenticated, user } = usePrivy();
  const { login } = useLogin();
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    alert(`Fitur donasi belum terhubung ke kontrak. Jumlah: ${amount}`);
  };

  if (!ready) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Backer Page</h1>

      {!authenticated ? (
        <button onClick={login} className="px-6 py-2 bg-purple-700 rounded">
          Connect Wallet to Donate
        </button>
      ) : (
        <>
          <p className="mb-2">Wallet: {user?.wallet?.address}</p>
          <input
            type="number"
            placeholder="Enter donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-black px-4 py-2 rounded mb-4"
          />
          <button
            onClick={handleDonate}
            className="px-6 py-2 bg-green-600 rounded"
          >
            Donate
          </button>
        </>
      )}
    </main>
  );
}
