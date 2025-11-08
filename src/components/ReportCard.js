"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function ReportCard({ report }) {
  const [showDonate, setShowDonate] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to donate');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/${report._id}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          message: donationMessage
        })
      });

      if (response.ok) {
        alert('Donation successful! Thank you for your support.');
        setShowDonate(false);
        setDonationAmount('');
        setDonationMessage('');
        window.location.reload();
      } else {
        const error = await response.json();
        alert('Donation failed: ' + error.message);
      }
    } catch (error) {
      alert('Donation failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition border border-gray-100">
      <h3 className="text-lg font-semibold text-green-700 mb-1">{report.title}</h3>
      <p className="text-gray-600 text-sm mb-2">📍 {report.location}</p>
      <p className="text-gray-700 mb-3">{report.description}</p>

      {report.image && (
        <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${report.image}`}
            alt={report.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <span
          className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
            report.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {report.status}
        </span>

        {report.createdBy && (
          <span className="text-xs text-gray-500">
            By: {report.createdBy.username}
          </span>
        )}
      </div>

      {/* Donation Section */}
      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-green-700">
            Donations: ₦{report.totalDonations || 0}
          </span>
          {user && (
            <button
              onClick={() => setShowDonate(!showDonate)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-sm transition"
            >
              Donate
            </button>
          )}
        </div>

        {!user && (
          <p className="text-xs text-gray-500">
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </a> to support this cause
          </p>
        )}

        {showDonate && user && (
          <form onSubmit={handleDonate} className="mt-3 space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Amount (₦)
              </label>
              <input
                type="number"
                required
                min="1"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={donationMessage}
                onChange={(e) => setDonationMessage(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Add an encouraging message"
                rows="2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm disabled:opacity-50 transition"
            >
              {loading ? 'Processing...' : 'Make Donation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}