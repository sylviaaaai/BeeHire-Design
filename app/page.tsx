"use client";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#070F2B] text-white overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />

      {/* Star dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
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

      {/* Content */}
      <div className="relative w-full max-w-xs px-6 flex flex-col items-center text-center">
        {/* Logo */}
        <img src="/Blank Logo.png" alt="Behire Logo" className="w-72 mb-10" />

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-3">
          Welcome to <span className="bg-white/15 px-2 py-1 rounded-lg">Be</span>
          hire.
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 mb-12">Sleep. Earn.</p>

        {/* CTA */}
        <button
          onClick={() => {
            window.location.href = "/Login";
          }}
          className="w-full py-4 rounded-full bg-[#9AA4FF] text-[#070F2B] font-semibold text-lg shadow-lg shadow-[#9AA4FF]/30 hover:opacity-90 transition"
        >
          GET STARTED
        </button>
      </div>
    </main>
  );
}
