import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-gray-800 p-24 font-sans">
      <h1 className="mt-0 mb-16 max-w-80">Page not found</h1>
      <p className="mb-12">
        Sorry 😔, we couldn't find what you were looking for.
        <br />
        <br />
        <Link href="/" className="text-blue-600 hover:underline">
          Go home
        </Link>
        .
      </p>
    </main>
  );
}
