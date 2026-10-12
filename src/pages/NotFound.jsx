
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-green-700">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-gray-600">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-green-700 px-6 py-3 text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
