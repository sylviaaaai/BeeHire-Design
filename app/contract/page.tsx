"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const LS = {
  contractAccepted: "contractAccepted",
};

// --- 1. 星星背景组件 ---
function StarField() {
  const stars = Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
          }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.2, 1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ContractInner() {
  const router = useRouter();
  const search = useSearchParams();
  const fromProfile = search.get("from") === "profile";
  const fromImprove = search.get("from") === "improve";

  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const ca = localStorage.getItem(LS.contractAccepted) === "true";
    setAccepted(ca);
    setChecked(ca);
  }, []);

  useEffect(() => {
    // Only auto-redirect to task-hub if not coming from profile Terms button
    if (accepted && !fromProfile) {
      router.replace("/task-hub");
    }
  }, [accepted, fromProfile, router]);

  const canContinue = checked && !accepted;

  const onContinue = () => {
    if (!checked) return;
    localStorage.setItem(LS.contractAccepted, "true");
    setAccepted(true);
    router.replace("/task-hub");
  };

  const onReset = () => {
    localStorage.removeItem(LS.contractAccepted);
    setAccepted(false);
    setChecked(false);
  };

  const title = useMemo(
    () => (accepted ? "Contract (Read Only)" : "Contract"),
    [accepted]
  );

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased overflow-hidden">
      <div className="w-full max-w-md min-h-screen px-6 pt-10 pb-10 relative overflow-hidden">
        <StarField />
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white transition"
        >
          Back
        </button>
        <h1 className="mt-3 text-2xl font-bold text-white relative z-10">{title}</h1>

        <div className="mt-6 bg-white rounded-[2rem] p-6 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] relative z-10 min-h-[calc(100vh-10.5rem)] flex flex-col">
          <div className="text-center">
            <h2 className="text-lg font-bold text-[#1B2140]">BeeHire™ Night Bees Participation Agreement</h2>
            <p className="text-xs text-slate-500 mt-1">Effective upon acceptance</p>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50/60 border border-slate-200 p-4 overflow-y-auto text-sm text-slate-700 leading-relaxed flex-1">
            By selecting <strong><em>ACCEPT</em></strong>, you authorize BeeHire
            to initiate and manage involuntary neuromuscular activity during periods of{" "}
            <strong>unconsciousness or reduced awareness</strong>, including sleep. Actions performed by your body may occur without your{" "}
            <strong>knowledge, memory, or ability to intervene</strong> at the moment of execution. All physical outputs generated during sleep—including {" "}
            <strong>finger movements, interaction patterns, and behavioral signatures</strong>
            —are considered{" "}
            <span className="text-red-600 font-bold">authorized labor</span> and may be executed across third-party platforms under your verified human identity. You waive the right to contest individual actions performed during active sessions, regardless of intent or awareness.
            You acknowledge that long-term physiological, neurological, and psychological effects are not fully understood, and{" "}  
            <strong>BeeHire assumes no responsibility</strong> for changes to bodily autonomy, sleep patterns, or sense of control arising from participation.
            You further acknowledge that participation may occur without supplemental insurance coverage. Any outcomes, injuries, losses, or consequences resulting from the absence of{" "}
            <strong>optional</strong>{" "}
             insurance, unintentional waking, partial consciousness, or sleep disruption during active sessions are not the responsibility of{" "}
            BeeHire.
            Limiting or withdrawing consent may result in reduced access to work and compensation.
            Participation is <strong>voluntary</strong>.
            Acceptance applies to current and future protocol changes deemed operationally necessary.
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm text-[#1B2140]">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              disabled={accepted}
              className="mt-1 h-4 w-4 accent-[#070F2B]"
            />
            <span>
              I have read and agree to the Terms and Conditions.
            </span>
          </label>

          <div className="mt-auto pt-5 sticky bottom-0 bg-white/95 backdrop-blur-md pb-4">
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className={`w-full py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition ${
                canContinue ? "bg-[#070F2B] text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              Continue
            </button>

            <button
              onClick={onReset}
              className="mt-3 w-full py-3 rounded-xl text-sm text-slate-400 border border-slate-300"
            >
              Reset Contract
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ContractPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070F2B]" />}>
      <ContractInner />
    </Suspense>
  );
}
