import { Link } from "react-router-dom";

function Onboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col">
      

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Hire Talent or Sell Your Skills
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          GigHub connects skilled freelancers with clients who need quality work done fast — 
          from design and development to marketing and writing.
        </p>

        <div className="flex gap-4">
          <Link
            to="/auth/register"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition"
          >
            Join as Freelancer
          </Link>
          <Link
            to="/auth/login"
            className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">💼 Post Gigs</h3>
            <p className="text-gray-600">Create professional gigs in minutes and reach global clients.</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">🤝 Hire Talent</h3>
            <p className="text-gray-600">Find verified freelancers, compare pricing, and get work delivered fast.</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">📈 Grow Securely</h3>
            <p className="text-gray-600">Track orders, payments, and performance right from your dashboard.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Onboarding;
