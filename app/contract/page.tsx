"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const LS = {
  contractAccepted: "contractAccepted",
};

const CONTRACT_VERSION = "2026-03-01";

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
    <div className="pointer-events-none absolute inset-0 z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
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

  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem(LS.contractAccepted) === CONTRACT_VERSION;
    setAccepted(isAccepted);
    setChecked(isAccepted);
  }, []);

  useEffect(() => {
    if (accepted && !fromProfile) {
      router.replace("/task-hub");
    }
  }, [accepted, fromProfile, router]);

  const canContinue = checked && !accepted;

  const onContinue = () => {
    if (!checked) return;
    localStorage.setItem(LS.contractAccepted, CONTRACT_VERSION);
    setAccepted(true);
    router.replace("/task-hub");
  };

  const onReset = () => {
    localStorage.removeItem(LS.contractAccepted);
    setAccepted(false);
    setChecked(false);
  };

  const title = useMemo(() => (accepted ? "Contract (Read Only)" : "Contract"), [accepted]);

  return (
    <main className="flex min-h-screen justify-center overflow-hidden bg-[#070F2B] font-sans antialiased">
      <div className="relative min-h-screen w-full max-w-md overflow-hidden px-6 pt-10 pb-10">
        <StarField />

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 transition hover:text-white"
        >
          Back
        </button>

        <h1 className="relative z-10 mt-3 text-2xl font-bold text-white">{title}</h1>

        <div className="relative z-10 mt-6 flex min-h-[calc(100vh-10.5rem)] flex-col rounded-[2rem] bg-white p-6 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="text-center">
            <h2 className="text-lg font-bold text-[#1B2140]">Autonomous Body Use Protocol</h2>
            <p className="mt-1 text-xs text-slate-500">Effective upon acceptance</p>
          </div>

          <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-700">
            <p>
              By selecting <strong><em>ACCEPT</em></strong>, you authorize BeeHire to initiate and
              manage <strong>involuntary neuromuscular activity</strong> during your periods of
              unconsciousness or reduced awareness, including sleep. You acknowledge that actions
              performed by your body may occur without your knowledge, memory, or ability to
              intervene at the moment of execution.
            </p>

            <p>
              All physical outputs generated during sleep, including finger movements, interaction
              patterns, and behavioral signatures, are considered{" "}
              <span className="font-bold text-red-600">authorized labor</span> and may be executed
              across third-party platforms under your verified biological identity. You waive the
              right to contest individual actions performed during active sessions, regardless of
              intent or awareness.
            </p>

            <p>
              You acknowledge that long-term physiological, neurological, and psychological effects
              are not fully understood, and <strong>BeeHire assumes no responsibility</strong> for
              changes to bodily autonomy, sleep patterns, or sense of control arising from
              participation.
            </p>

            <p>
              You further acknowledge that participation may occur without supplemental insurance
              coverage. Any outcomes, injuries, losses, or consequences resulting from the absence
              of optional insurance, unintentional waking, partial consciousness, or sleep
              disruption during active sessions are not the responsibility of BeeHire.
            </p>

            <p>
              Limiting or withdrawing consent may affect task allocation, compensation tiers, and
              continued platform eligibility.
            </p>

            <p>
              Participation is <strong>voluntary</strong>. Acceptance applies to current and future
              protocol changes deemed operationally necessary.
            </p>
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm text-[#1B2140]">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              disabled={accepted}
              className="mt-1 h-4 w-4 accent-[#070F2B]"
            />
            <span>I have read and agree to the Terms and Conditions.</span>
          </label>

          <div className="sticky bottom-0 mt-auto bg-white/95 pt-5 pb-4 backdrop-blur-md">
            <button
              onClick={onContinue}
              disabled={!canContinue}
              className={`w-full rounded-2xl py-4 font-bold shadow-xl transition active:scale-95 ${
                canContinue ? "bg-[#070F2B] text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              Continue
            </button>

            <button
              onClick={onReset}
              className="mt-3 w-full rounded-xl border border-slate-300 py-3 text-sm text-slate-400"
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
