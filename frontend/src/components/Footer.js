export default function Footer() {
  return (
    <footer
      className="text-sm text-gray-300 py-4 text-center"
      style={{ backgroundColor: "#111827" }}
    >
      © {new Date().getFullYear()} CleanAlert. All rights reserved.
    </footer>
  );
}
