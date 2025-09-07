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
          router.push("/results"); // ✅ الانتقال إلى صفحة النتائج
          return 100;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval); // تنظيف عند إلغاء المكون
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-">
      <h1 className="text-3xl font-bold mb-6">Processing Video...</h1>
      <div className="w-full max-w-md">
        <div className="w-full bg-gray-200 rounded-full h-6 mb-8">
          <div
            className="bg-purple-600 h-6 rounded-full text-center text-white font-medium"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
