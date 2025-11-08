"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reports from backend
  const fetchReports = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`);
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Update report status
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();

      // Update state locally
      setReports((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: updated.report.status } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading reports...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Admin Dashboard – Manage Reports
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No reports found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col"
            >
              <h3 className="font-semibold text-green-700 text-lg">{report.title}</h3>
              <p className="text-sm text-gray-600 mt-1">📍 {report.location}</p>
              <p className="text-sm text-gray-500 mt-2">{report.description}</p>

              {report.image && (
                <div className="mt-3 w-full h-40 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${report.image}`}
                    alt={report.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                    priority={false} 
                  />
                </div>
              )}


              <p
                className={`mt-3 text-sm font-medium ${
                  report.status === "Resolved"
                    ? "text-green-700"
                    : "text-yellow-600"
                }`}
              >
                Status: {report.status}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updateStatus(report._id, "Pending")}
                  className="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                >
                  Set Pending
                </button>
                <button
                  onClick={() => updateStatus(report._id, "Resolved")}
                  className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                >
                  Set Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
