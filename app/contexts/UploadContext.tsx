"use client";

import React, { createContext, useContext, useState } from "react";

type UploadContextType = {
  startFileUpload: (file: File) => void;
  isLoading: boolean;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startFileUpload = (file: File) => {
    setIsLoading(true);
    console.log("Uploading file:", file.name);

    // simulate async upload
    setTimeout(() => {
      setIsLoading(false);
      console.log("Upload finished!");
    }, 2000);
  };

  return (
    <UploadContext.Provider value={{ startFileUpload, isLoading }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within UploadProvider");
  return context;
};
