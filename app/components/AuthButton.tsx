"use client";
import React from "react";

export default function AuthButton() {
  const handleLogin = () => {
    alert("Login clicked");
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Login
    </button>
  );
}