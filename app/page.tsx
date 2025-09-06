'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">مرحبا بك في Vizard Clone</h1>
      <p className="text-gray-700 mb-6 text-center">
        قم برفع الفيديوهات الخاصة بك، وحصل على مقاطع AI بسهولة
      </p>
      <div className="flex gap-4">
        <Link href="/upload-page">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            رفع فيديو
          </button>
        </Link>
        <Link href="/editor">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            الانتقال إلى المحرر
          </button>
        </Link>
      </div>
    </div>
  );
}

