 'use client';

export default function Error({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 text-sm mb-6">{error.message || "Unexpected error occurred."}</p>
      </div>
    </div>
  );
}