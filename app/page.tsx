'use client';


import React, { useRef } from "react";
import Image from "next/image"; // ✅ حسب طريقة التصدير عندك
import ClipMagicLogo from "./components/ClipMagicLogo";
import AuthButton from "./components/AuthButton";
import { useUpload } from "./contexts/UploadContext";
import Button from "./components/ui/button";
import { Upload } from "lucide-react"; // ✅ بدل antd
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";


function HeroForm() {
  const { startFileUpload, isLoading } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      startFileUpload(file); // رفع الملف
      router.push("/upload-page"); // الانتقال مباشرة بعد اختيار الملف
    }
  };

  return (
    <div className="text-center mt-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="video/*"
        disabled={isLoading}
      />
      <Button
        size="md"
        onClick={() => fileInputRef.current?.click()}
        className=" bg-yellow-300 text-white font-bold text-lg px-7 py-3"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : <><Upload className="mr-2" /> UPLOAD A VIDEO</>}
      </Button>
      <p className="text-xs mt-2 text-white/70">.MP4, .MOV supported. Max 2GB.</p>
    </div>
  );
}

export default function HomePage() {
  const navItems = ["Spark 1.0", "Use cases", "Tools", "Resources", "Pricing", "Affiliates"];

  return (
    <div className="bg-custom-gradient text-white min-h-screen">
      <header className="py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <ClipMagicLogo style={{ height: 32, width: 32 }} />
              <h1 className="text-2xl font-bold">ClipMagic</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {navItems.map(item => (
                <Link key={item} href="#" className="flex items-center hover:text-yellow-400">
                  {item} <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
              ))}
            </nav>
          </div>
          <AuthButton />
        </div>
      </header>

      <main className="text-center py-16 px-4">
        <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
          <span className="bg-purple-300 text-purple-800 text-xs font-bold mr-2 px-2 rounded-full">NEW</span>
          <span>Explore our next-gen AI model that clips any video.</span>
          <Button variant="outline" className="text-white border-white/50 bg-transparent hover:bg-white/20 text-xs h-6 ml-4">
            About Spark 1.0
          </Button>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold">
          Turn your long video<br />
          into viral clips with AI <span className="text-yellow-400">magic</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-white/80">
          ClipMagic uses AI to turn your long-form videos into short clips ready for
          channels like TikTok, Instagram, YouTube Shorts, and more.
        </p>
        <HeroForm />
        <div className="max-w-4xl mx-auto mt-12">
          <Image src="/placeholder.svg" alt="App preview" width={900} height={500} className="rounded-xl shadow-2xl bg-white/10" priority />
        </div>
      </main>
    </div>
  );
}

