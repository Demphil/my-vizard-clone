"use client";
import * as React from "react";

export function Select({ value, onValueChange, children }: any) {
  return <div>{children}</div>; // Placeholder UI
}

export function SelectTrigger({ className, children, ...props }: any) {
  return (
    <button className={`flex items-center justify-between border rounded-md px-3 py-2 ${className}`} {...props}>
      {children}
    </button>
  );
}

export function SelectValue() {
  return <span>Select...</span>;
}

export function SelectContent({ children }: any) {
  return <div className="border rounded-md mt-1 bg-white shadow-lg">{children}</div>;
}

export function SelectItem({ value, children, ...props }: any) {
  return (
    <div className="cursor-pointer px-3 py-2 hover:bg-gray-100" {...props}>
      {children}
    </div>
  );
}
