import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import Link from "next/link";

export default function Home() {
  const { ready, authenticated, user } = usePrivy();
  const { login } = useLogin();
  const { logout } = useLogout();

  if (!ready) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-purple-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">Mint to Earn</h1>

      {!authenticated ? (
        <button onClick={login} className="px-6 py-2 bg-black rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="flex gap-4">
            <Link href="/mint">
              <button className="px-6 py-2 bg-black rounded">Mint</button>
            </Link>
            <Link href="/backer">
              <button className="px-6 py-2 bg-black rounded">Backer</button>
            </Link>
          </div>
          <p className="mt-4 text-sm">Welcome, {user?.wallet?.address}</p>
          <button onClick={logout} className="mt-2 underline text-xs">
            Logout
          </button>
        </>
      )}
    </main>
  );
}
