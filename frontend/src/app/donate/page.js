import DonationForm from "../../components/DonationForm";

export default function DonatePage() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-amber-600 mb-2">Support CleanAlert 💚</h1>
      <p className="text-gray-600 mb-6">
        Your donations empower cleanup initiatives and community education.
      </p>
      <DonationForm />
    </div>
  );
}
