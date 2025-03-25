"use client"; // ต้องเป็น Client Component

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mt-2">
        An unexpected error has occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
