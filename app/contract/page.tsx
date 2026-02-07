"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LS = {
  contractAccepted: "contractAccepted",
};

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
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen px-6 pt-10 pb-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white transition"
        >
          Back
        </button>
        <h1 className="mt-3 text-2xl font-bold text-white">{title}</h1>

        <div className="mt-6 bg-white rounded-[2rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="h-64 rounded-2xl bg-slate-50 border border-slate-200" />

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

          <button
            onClick={onContinue}
            disabled={!canContinue}
            className={`mt-6 w-full py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition ${
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
