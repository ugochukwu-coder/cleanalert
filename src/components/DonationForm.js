"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function DonationForm() {
  const [form, setForm] = useState({ name: "", email: "", amount: "" });
  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to make a donation');
      return;
    }

    alert(`💚 Thank you, ${form.name}, for donating ₦${form.amount}!`);
    setForm({ name: "", email: "", amount: "" });
  };

  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-100 max-w-md mx-auto text-center">
        <h3 className="text-lg font-semibold text-gray-700">Login to Donate</h3>
        <p className="text-gray-600 text-sm mb-4">
          Please login to make donations and support cleanup initiatives.
        </p>
        <a 
          href="/auth/login"
          className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition block"
        >
          Login to Continue
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-100 max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Donation Amount (₦)
        </label>
        <input
          type="number"
          name="amount"
          placeholder="5000"
          value={form.amount}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition"
      >
        Donate Now
      </button>
    </form>
  );
}