"use client";
import * as React from "react";

export function Dialog({ open, onOpenChange, children }: any) {
  return open ? <div className="fixed inset-0 bg-black/50 flex items-center justify-center">{children}</div> : null;
}

export function DialogTrigger({ asChild, children }: any) {
  return <>{children}</>;
}

export function DialogContent({ children, className }: any) {
  return <div className={`bg-white rounded-lg p-6 ${className}`}>{children}</div>;
}

export function DialogHeader({ children }: any) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: any) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function DialogFooter({ children }: any) {
  return <div className="flex justify-end space-x-2 mt-4">{children}</div>;
}
