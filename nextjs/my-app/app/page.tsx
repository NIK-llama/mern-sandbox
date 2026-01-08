import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md text-center shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">
          📝 Todo App
        </h1>

        <p className="text-zinc-400 mb-8">
          Organize your tasks. Stay productive.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/auth/signin"
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition"
          >
            Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="border border-zinc-700 hover:bg-zinc-800 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
