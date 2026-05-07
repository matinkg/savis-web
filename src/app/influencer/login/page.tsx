"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { request } from "@/configs/HTTPService";

export default function InfluencerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await request(
      "/api/v1/influencer/login",
      "POST",
    { email, password }
    );
    
    const data = res?.data;

    if (data?.token) {
      document.cookie = `iAuthToken=${data.token}; path=/;`;
      router.push("/influencer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-yellow-400 rounded-2xl shadow-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
          ورود اینفلوئنسر
        </h2>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-3 rounded-lg border border-yellow-300 bg-white/10 text-white placeholder:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full p-3 rounded-lg border border-yellow-300 bg-white/10 text-white placeholder:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition duration-300"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
