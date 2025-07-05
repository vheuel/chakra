import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useState } from "react";

type NFT = {
  id: number;
  title: string;
  image: string;
  totalDonation: number;
};

const dummyNFTs: NFT[] = [
  {
    id: 1,
    title: "Supporter: 0xABC123",
    image: "https://via.placeholder.com/200",
    totalDonation: 1.5,
  },
  {
    id: 2,
    title: "Supporter: 0xDEF456",
    image: "https://via.placeholder.com/200",
    totalDonation: 2.0,
  },
];

export default function MintPage() {
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const [minted, setMinted] = useState(false);

  if (!ready) return <p>Loading...</p>;

  const handleMint = (nft: NFT) => {
    alert(`Minted NFT from ${nft.title}!\nReward 1% of ${nft.totalDonation} MON`);
    setMinted(true);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Mint a Backed NFT</h1>

      {!authenticated ? (
        <button onClick={login} className="px-6 py-2 bg-purple-600 rounded">
          Connect Wallet
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyNFTs.map((nft) => (
            <div key={nft.id} className="bg-black p-4 rounded shadow-lg">
              <img src={nft.image} alt={nft.title} className="mb-4 rounded" />
              <h2 className="text-xl font-semibold">{nft.title}</h2>
              <p className="text-sm mb-2">Total Donation: {nft.totalDonation} MON</p>
              <button
                onClick={() => handleMint(nft)}
                disabled={minted}
                className="px-4 py-2 bg-green-700 rounded"
              >
                Mint NFT
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
