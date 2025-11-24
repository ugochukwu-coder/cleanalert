"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  // Check authentication and get token
  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access admin features");
      router.push("/auth/login");
      return null;
    }
    return token;
  };

  // Fetch all reports from backend
  const fetchReports = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }
      
      if (res.status === 403) {
        throw new Error("Admin access required. You don't have permission to view reports.");
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch reports: ${res.status}`);
      }
      
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchReports();


  // Update report status
  const updateStatus = async (id, status) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}/status`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }

      if (response.status === 403) {
        throw new Error("Admin access required. You don't have permission to update reports.");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }
      
      const updatedReport = await response.json();

      // Update state locally
      setReports((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: updatedReport.status } : r
        )
      );

      alert(` Status updated to "${status}" successfully!`);

    } catch (err) {
      console.error("Update error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  // Delete report function
  const deleteReport = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this report? This action cannot be undone."
    );
    
    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}`,
        {
          method: "DELETE",
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }

      if (response.status === 403) {
        throw new Error("Admin access required to delete reports.");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete: ${response.status} - ${errorText}`);
      }
      
      // Remove report from state
      setReports((prev) => prev.filter((report) => report._id !== id));
      
      alert(" Report deleted successfully!");

    } catch (err) {
      console.error("Delete error:", err);
      alert(`Error deleting report: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // ADD THIS MISSING FUNCTION - Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  // Retry function for error state
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchReports();
  };

  if (loading)
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading reports...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Error: {error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => router.push('/auth/login')}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Go to Login
            </button>
            <button 
              onClick={handleRetry}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Admin Dashboard - Manage Reports
        </h1>
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No reports found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col relative"
            >
              {/* Delete Button - Top Right Corner */}
              <button
                onClick={() => deleteReport(report._id)}
                disabled={deletingId === report._id}
                className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition disabled:opacity-50"
                title="Delete Report"
              >
                {deletingId === report._id ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>

              <h3 className="font-semibold text-green-700 text-lg pr-6">{report.title}</h3>
              <p className="text-sm text-gray-600 mt-1">📍 {report.location}</p>
              <p className="text-sm text-gray-500 mt-2">{report.description}</p>

             {report.image?.url && (
          <div className="mt-3 w-full h-40 relative">
              <Image
                    src={report.image.url}         // Cloudinary URL
                    alt={report.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                    unoptimized                    // Optional
                  />
                </div>
              )}


              {report.donations && report.donations.length > 0 && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm text-blue-700">
                    💰 Donations: ${report.totalDonations || 0}
                  </p>
                  <p className="text-xs text-blue-600">
                    {report.donations.length} donation(s)
                  </p>
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
                  className={`flex-1 px-3 py-2 text-sm rounded transition ${
                    report.status === "Pending" 
                      ? "bg-yellow-500 text-white cursor-not-allowed" 
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  }`}
                  disabled={report.status === "Pending" || deletingId === report._id}
                >
                  {report.status === "Pending" ? "Currently Pending" : "Set to Pending"}
                </button>
                <button
                  onClick={() => updateStatus(report._id, "Resolved")}
                  className={`flex-1 px-3 py-2 text-sm rounded transition ${
                    report.status === "Resolved" 
                      ? "bg-green-500 text-white cursor-not-allowed" 
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                  disabled={report.status === "Resolved" || deletingId === report._id}
                >
                  {report.status === "Resolved" ? "Already Resolved" : "Mark as Resolved"}
                </button>
              </div>

              {/* Report metadata */}
              <div className="mt-2 text-xs text-gray-400">
                <p>Created: {new Date(report.createdAt).toLocaleDateString()}</p>
                <p>ID: {report._id.substring(0, 8)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}