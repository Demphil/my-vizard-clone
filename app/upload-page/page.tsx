'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [language, setLanguage] = useState('Arabic');
  const [aiClips, setAiClips] = useState(true);
  const router = useRouter();

  const handleUpload = () => router.push('/editor');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-wihte-500">
      <div className="w-full max-w-md bg-wihte shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-5">Upload Video</h1>

        {/* Video Preview */}
        <div className="flex items-center justify-between border p-3 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/vercel.svg"
              alt="video thumbnail"
              className="w-12 h-12 rounded-lg"
            />
            <span className="text-md font-medium">
              الدواء والتمارين الرياضي...
            </span>
          </div>
          <span className="bg-gray-200 text-sm px-2 py-1 rounded">1080p</span>
        </div>

        {/* Language select */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option>Arabic (عربي)</option>
          <option>English</option>
          <option>French</option>
        </select>

        {/* AI toggle */}
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium">Get AI clips</label>
          <input
            type="checkbox"
            checked={aiClips}
            onChange={() => setAiClips(!aiClips)}
            className="w-5 h-5"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
