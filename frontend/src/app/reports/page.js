"use client";
import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports`);
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Community Reports</h1>
      <p className="text-gray-600 mb-6">
        Explore reported issues around your community.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <ReportCard key={r._id} report={r} />
        ))}
      </div>
    </div>
  );
}
