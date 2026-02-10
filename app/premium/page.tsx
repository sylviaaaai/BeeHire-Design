"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Crown, Check, Lock } from "lucide-react";

export default function PremiumPage() {
  const router = useRouter();
  const [beeTier, setBeeTier] = useState<"New" | "Advanced" | "Golden">("New");
  const [workDays, setWorkDays] = useState(0);
  const [performance, setPerformance] = useState(0);

  useEffect(() => {
    const t = (localStorage.getItem("beeTier") as "New" | "Advanced" | "Golden") || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);

    const storedDays = Number(localStorage.getItem("workDays"));
    const storedPerf = Number(localStorage.getItem("performance"));
    setWorkDays(Number.isFinite(storedDays) && storedDays > 0 ? storedDays : 260);
    setPerformance(Number.isFinite(storedPerf) && storedPerf > 0 ? storedPerf : 7.3);
  }, []);

  const eligibleForAdvanced = beeTier === "New" && workDays > 90 && performance > 7;

  const upgradeToAdvanced = () => {
    if (!eligibleForAdvanced) return;
    localStorage.setItem("beeTier", "Advanced");
    setBeeTier("Advanced");
    router.push("/task-hub");
  };

  return (
    <main className="min-h-screen bg-[#FFFDF8] flex justify-center">
      <div className="w-full max-w-md min-h-screen text-[#1B2140]">
        {/* Top Premium Section */}
        <div
          className="px-6 py-8"
          style={{
            backgroundImage: "url(/background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#1B2140]/80 hover:text-[#1B2140] transition mb-4"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">Unlock Premium Contracts</h1>

          <p className="text-center text-gray-500 mb-6">
            Higher Bounty. Priority Matching. Faster Payouts.
          </p>

          {/* Hero Badge */}
          <div className="flex justify-center mb-0.5 -mt-4">
            <div className="relative flex flex-col items-center">
              <img
                src="/golden.png"
                alt="Golden"
                className="w-72 h-72 object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.22)] scale-150"
              />
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-[#FFF8E8]/90 backdrop-blur-[2px] rounded-3xl p-6 shadow-md mt-0.5 mb-10 border border-[#EBD9B5]">
            <h2 className="text-lg font-bold text-center mb-2">Golden Bee Membership</h2>

            <p className="text-center text-3xl font-bold mb-4">
              $20 <span className="text-base font-medium">/ month</span>
            </p>

            <div className="space-y-3 mb-6">
              <Feature text="Priority access to Premium tasks" />
              <Feature text="Higher bounty multipliers" />
              <Feature text="Early task notifications" />
            </div>

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg shadow-lg active:scale-95">
              Start Premium - $20/month
            </button>
          </div>
        </div>

        <div className="-mt-4">
          {/* Section Title */}
          <h3 className="text-center font-bold mb-4">
            Get Access To Bounty Multipliers With A Premium Membership
          </h3>

          {/* Premium Task Preview */}
          <div className="grid grid-cols-3 gap-4">
            <PremiumTask company="LEGO" bounty="$48.00 / hr" />
            <PremiumTask company="PicTake.AI" bounty="$50.00 / hr" />
            <PremiumTask company="UPS" bounty="$48.00 / hr" />
          </div>

          {/* Advanced Bee Upgrade */}
          <div className="relative bg-[#FFF8E8] rounded-3xl p-6 shadow-md mt-10 mb-10 border border-[#EBD9B5]">
            {eligibleForAdvanced && (
              <span className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-red-500 border border-white/70" />
            )}
            <h2 className="text-lg font-bold text-center mb-1 text-[#1B2140]">
              Upgrade to Advanced Bee
            </h2>
            <p className="text-center text-sm text-slate-500 mb-4">
              Requirements: work days &gt; 90 and performance &gt; 7 (New Bee only)
            </p>

            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <div className="rounded-2xl bg-white border border-[#E6E1D6] p-3">
                <p className="text-xs text-slate-500">Work Days</p>
                <p className="text-lg font-bold text-[#1B2140]">{workDays}</p>
              </div>
              <div className="rounded-2xl bg-white border border-[#E6E1D6] p-3">
                <p className="text-xs text-slate-500">Performance</p>
                <p className="text-lg font-bold text-[#1B2140]">{performance.toFixed(1)}</p>
              </div>
            </div>

            <button
              onClick={upgradeToAdvanced}
              disabled={!eligibleForAdvanced}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition ${
                eligibleForAdvanced
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              Upgrade to Advanced Bee!
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-gray-400 mt-8 text-center leading-relaxed">
          Premium access does not guarantee task availability. Eligibility is subject to performance metrics and
          policy updates. Premium tasks require a performance score of higher. Non-compliance may result in
          temporary Premium suspension.
        </p>
      </div>
    </main>
  );
}

/* ---------------- Sub Components ---------------- */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="text-green-600" size={18} />
      <p>{text}</p>
    </div>
  );
}

function logoForCompany(company: string) {
  const map: Record<string, string> = {
    LEGO: "/lego.png",
    "PicTake.AI": "/PicTake.png",
    UPS: "/ups.png",
  };
  return map[company];
}

function PremiumTask({ company, bounty }: { company: string; bounty: string }) {
  return (
    <div className="relative bg-[#FFF8E8] rounded-2xl pt-6 pb-3 px-3 flex flex-col items-center shadow">
      <img
        src="/label2.png"
        alt="Premium ribbon"
        className="absolute -top-5 w-32 h-10 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.2)]"
      />
      {/* Logo Placeholder */}
      <div className="w-16 h-16 bg-white rounded-xl mb-2 flex items-center justify-center overflow-hidden">
        {logoForCompany(company) ? (
          <img
            src={logoForCompany(company)}
            alt={company}
            className={`object-contain ${company === "PicTake.AI" ? "w-[180px] h-[180px]" : "w-10 h-10"}`}
          />
        ) : null}
      </div>

      <p className="text-sm font-bold mb-1">{company}</p>

      <p className="text-[10px] text-green-700 mb-2">Bounty: {bounty}</p>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Lock size={12} />
        Locked
      </div>
    </div>
  );
}
