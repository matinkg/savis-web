"use client";

import React from 'react';
import Link from 'next/link';
// import { redirect } from 'next/navigation';

// app/influencer/layout.tsx
export default function InfluencerMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <header className="text-2xl font-bold mb-4 text-purple-700">🎉 Influencer Landing</header>
      <main>{children}</main>
    </div>
  );
}

