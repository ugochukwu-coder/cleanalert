export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-green-50 text-center px-6 py-12">
      {/* Content Section */}
      <section className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Welcome to CleanAlert 🌍
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mb-8">
          CleanAlert helps you report unclean environments, garbage dumps, and waste issues in your area.  
          Together, we can keep our communities clean and safe!
        </p>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
            Report an Issue
          </button>

          <button className="bg-white border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium shadow-md hover:bg-green-100 transition">
            View Reports
          </button>

          {/* Donate Button */}
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
            Donate 💚
          </button>
        </div>

        <p className="mt-8 text-gray-600 max-w-xl">
          Your donations help us maintain this platform, support cleanup drives, and encourage community participation.  
          Every contribution makes a difference!
        </p>
      </section>

      {/* Footer Section */}
      <footer className="text-sm text-gray-500 py-4 border-t border-green-100">
        © {new Date().getFullYear()} CleanAlert. All rights reserved.
      </footer>
    </main>
  );
}
