"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB.");
        return;
      }

      setImage(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit a report");
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!formData.title || !formData.location || !formData.description) {
        throw new Error("Please fill in all required fields.");
      }

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("location", formData.location);
      submitData.append("description", formData.description);

      if (image) {
        submitData.append("image", image);
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submitData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.status}`);
      }

      setSuccess("Report submitted successfully!");

      setFormData({
        title: "",
        location: "",
        description: "",
      });

      setImage(null);
      const fileInput = document.getElementById("image");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(err.message || "Failed to submit report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 m-4">
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Submit Cleanup Report
            </h2>
            <p className="text-gray-600 text-sm">
              Please login to continue
            </p>
          </div>
          <a
            href="/auth/login"
            className="inline-block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition duration-200 text-center"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
        Submit Cleanup Report
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
            placeholder="Enter report title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
            placeholder="Enter location"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base resize-vertical"
            placeholder="Describe the cleanup needed..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer"
          />

          {image && (
            <p className="mt-2 text-sm text-green-700">
              Selected: {image.name} ({(image.size / 1048576).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 text-base font-medium transition duration-200"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Report"
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;