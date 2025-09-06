'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditorPage() {
  const [videoName, setVideoName] = useState("فيديو جديد");
  const [aiEnabled, setAiEnabled] = useState(true);
  const router = useRouter();

  const handleProcess = () => router.push('/processing');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Editor Page</h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <label className="block mb-2 font-medium">اسم الفيديو:</label>
        <input
          type="text"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium">تفعيل AI Clips</label>
          <input
            type="checkbox"
            checked={aiEnabled}
            onChange={() => setAiEnabled(!aiEnabled)}
            className="w-5 h-5"
          />
        </div>

        <button
          onClick={handleProcess}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          معالجة الفيديو
        </button>
      </div>
    </div>
  );
}

