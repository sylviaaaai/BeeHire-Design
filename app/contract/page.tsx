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

  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const ca = localStorage.getItem(LS.contractAccepted) === "true";
    setAccepted(ca);
    setChecked(ca);
  }, []);

  useEffect(() => {
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
            By enrolling as a BeeHire™ Night Bee, you voluntarily authorize BeeHire™, its affiliates, and
            authorized enterprise partners to coordinate, initiate, and manage sleep-based participation
            activities during rest periods selected or inferred through the application, including the use of
            low-intensity neuromuscular stimulation technologies designed to facilitate system-guided motor
            activity without the requirement of conscious attention or active decision-making, and you
            acknowledge that such activities may occur partially or fully outside of conscious awareness, may
            continue across variable sleep states, and may not be immediately perceptible or interruptible upon
            partial waking; you further consent to the collection, processing, analysis, optimization, and
            derivative use of biological, behavioral, temporal, and interaction-based data generated through
            participation for purposes including but not limited to system performance, compensation
            calculation, client verification, model training, and service improvement, with the understanding
            that certain task details, activity records, or action-level disclosures may be limited, delayed,
            aggregated, or unavailable in order to preserve operational integrity, confidentiality, and
            platform effectiveness; you acknowledge that while BeeHire™ protocols are informed by existing
            biomedical research, the long-term neurological, physiological, or behavioral effects of repeated
            or extended participation are not fully established, may vary by individual, and are accepted as
            part of voluntary participation, and that compensation estimates displayed within the app are
            projections subject to dynamic adjustment based on system demand, consent scope, participation
            continuity, and performance indicators, and do not constitute guaranteed income; by continuing,
            you accept responsibility for participation outcomes within disclosed parameters, including those
            not immediately observable, predictable, or reversible, and agree that continued use of the
            service constitutes ongoing acceptance of updated terms, data practices, and operational
            conditions as they may evolve over time.
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
