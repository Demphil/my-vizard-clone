"use client";
import * as React from "react";

export function Popover({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function PopoverTrigger({ asChild, children }: any) {
  return <>{children}</>;
}

export function PopoverContent({ children, className }: any) {
  return (
    <div className={`absolute z-50 mt-2 rounded-md border bg-white shadow-lg ${className}`}>
      {children}
    </div>
  );
}
