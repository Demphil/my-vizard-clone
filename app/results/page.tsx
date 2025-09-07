import Image from "next/image"
import Button from "@/components/ui/button";

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-bold text-purple-700 text-center">
        Your AI Clips are Ready 🎉
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mt-2">
        Download, share, or schedule your clips directly to social platforms.
      </p>

      {/* Video clips preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl w-full">
        {[1, 2, 3].map((clip) => (
          <div
            key={clip}
            className="bg-black rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src={`/clip${clip}.mp4`} // ضع صور مصغرة لنتائج الفيديو في public
                alt={`Clip ${clip}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="font-medium">Clip {clip}</span>
              <Button defaultValue="primary">Download</Button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-4 mt-12">
        <Button variant="default">Download All</Button>
        <Button variant="outline">Schedule to Social Media</Button>
      </div>
    </div>
  )
};
