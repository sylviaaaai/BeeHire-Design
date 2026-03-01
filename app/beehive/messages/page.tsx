"use client";

import { ArrowLeft, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BeehiveMessagesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#eef1f7] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f6fb_42%,#ebedf5_100%)] text-[#1c2240]">
        <header className="sticky top-0 z-40 border-b border-white/70 bg-[#f8f9fd]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-5">
            <button
              onClick={() => router.push("/beehive")}
              className="flex items-center gap-2 text-sm font-semibold text-[#5d6790]"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-lg font-black tracking-[-0.03em] text-[#20264a]">Messages</h1>
            <div className="w-14" />
          </div>
        </header>

        <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white shadow-[0_18px_40px_rgba(31,45,88,0.08)]">
            <Inbox size={34} className="text-[#7c86ae]" />
          </div>
          <h2 className="mt-6 text-xl font-bold text-[#20264a]">No messages right now</h2>
          <p className="mt-2 text-sm text-[#7a82a6]">Current no messages.</p>
        </section>
      </div>
    </main>
  );
}
