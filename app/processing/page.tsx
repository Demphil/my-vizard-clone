'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Processing Video...</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
          <div
            className="bg-blue-600 h-6 rounded-full text-center text-white font-medium"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        {progress === 100 && (
          <button
            onClick={() => router.push('/editor')}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            العودة إلى المحرر
          </button>
        )}
      </div>
    </div>
  );
}
