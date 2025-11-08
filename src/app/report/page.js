import ReportForm from "../../components/ReportForm";

export default function ReportPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-2">Submit a Report</h1>
      <p className="text-gray-600 mb-6">
        Describe the issue you have noticed and help us take action.
      </p>
      <ReportForm />
    </div>
  );
}
