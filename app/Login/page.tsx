"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  function handleLogin() {
    if (!name) return;
    localStorage.setItem("username", name);
    router.push("/app");
  }

  return (
    <main className="relative min-h-screen bg-[#070F2B] text-white overflow-hidden flex items-center justify-center">

      {/* 🌌 背景柔光 */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>

      {/* ✨ 星点 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/70 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>

      {/* 📱 登录卡片 */}
      <div className="relative w-full max-w-xs px-6 flex flex-col items-center text-center">

        {/* Logo */}
        <img
          src="/Blank Logo.png"
          alt="Behire Logo"
          className="w-70 mb-8"
        />

        {/* 标题 */}
        <h1 className="text-2xl font-semibold mb-2">
          Enter Your Name
        </h1>

        <p className="text-white/60 mb-8 text-sm">
          This identity will be used in your session
        </p>

        {/* 输入框 */}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full px-4 py-3 rounded-xl 
            bg-white/10 border border-white/20 
            outline-none text-white 
            mb-6
            focus:border-[#9AA4FF]
          "
        />

        {/* 按钮 */}
        <button
          onClick={handleLogin}
          className="
            w-full py-3 rounded-full 
            bg-[#9AA4FF] text-[#070F2B] 
            font-semibold text-lg
            shadow-lg shadow-[#9AA4FF]/30
            hover:opacity-90 transition
          "
        >
          Continue
        </button>

      </div>

    </main>
  );
}


