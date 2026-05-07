import React from "react";

interface NotifyProps {
  className?: string;
  children: React.ReactNode;
}

export default function Notify({ className, children }: NotifyProps) {
  return <div className={className}>{children}</div>;
}
