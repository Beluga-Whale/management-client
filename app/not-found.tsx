"use client";
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
