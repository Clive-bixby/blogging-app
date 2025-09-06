export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-lg text-gray-700">Oops! Page not found.</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
