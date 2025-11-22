"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
        Welcome to CleanAlert 🌍
      </h1>

      <p className="text-gray-700 text-lg max-w-2xl mb-8">
        CleanAlert helps you report unclean environments, garbage dumps, and waste issues in your area.  
        Together, we can keep our communities clean and safe!
      </p>

      {user && (
        <div className="mb-6 p-4 bg-green-100 rounded-lg">
          <p className="text-green-700 font-medium">
            Welcome back, {user.username}! Ready to make a difference?
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
        <button
          onClick={() => router.push("/report")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          Report an Issue
        </button>

        <button
          onClick={() => router.push("/reports")}
          className="bg-white border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-100 transition"
        >
          View Reports
        </button>

        <button
          onClick={() => router.push("/donate")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          Donate 💚
        </button>
      </div>

      <p className="mt-8 text-gray-600 max-w-xl">
        Your donations help us maintain this platform, support cleanup drives, and encourage community participation.  
        Every contribution makes a difference!
      </p>
    </section>
  );
}