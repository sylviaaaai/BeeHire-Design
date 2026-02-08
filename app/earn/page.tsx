"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, LayoutGrid, Scale, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

type BeeTier = "New" | "Advanced" | "Golden";
type ControlLevel = "Low" | "Medium" | "High";

const BASE: Record<BeeTier, Record<ControlLevel, number>> = {
  New: { Low: 15, Medium: 20, High: 30 },
  Advanced: { Low: 19, Medium: 24, High: 36 },
  Golden: { Low: 32, Medium: 38, High: 50 },
};

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function EarnPage() {
  const router = useRouter();

  const [username, setUsername] = useState("Bee");
  const [beeTier, setBeeTier] = useState<BeeTier>("New");
  const [workDays, setWorkDays] = useState(0);
  const [performance, setPerformance] = useState(0);
  const [tier, setTier] = useState<BeeTier>("New");
  const [control, setControl] = useState<ControlLevel>("Medium");
  const [hours, setHours] = useState(6);

  useEffect(() => {
    const u = localStorage.getItem("username");
    if (u) setUsername(u);
    const t = (localStorage.getItem("beeTier") as BeeTier) || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);
    const storedDays = Number(localStorage.getItem("workDays"));
    const storedPerf = Number(localStorage.getItem("performance"));
    setWorkDays(Number.isFinite(storedDays) && storedDays > 0 ? storedDays : 120);
    setPerformance(Number.isFinite(storedPerf) && storedPerf > 0 ? storedPerf : 7.3);
  }, []);

  const { daily, monthly, annual } = useMemo(() => {
    const base = BASE[tier][control];
    const dailyIncome = base * hours;
    return {
      daily: dailyIncome,
      monthly: dailyIncome * 30,
      annual: dailyIncome * 365,
    };
  }, [tier, control, hours]);

  const showUpgradeDot = beeTier === "New" && workDays > 90 && performance > 7;

  return (
    <main className="min-h-screen bg-[#F7F8FB] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen relative">
        {/* Top hero */}
        <div
          className="relative px-6 pt-8 pb-8 text-white"
          style={{
            backgroundImage: "url(/bg-Earn.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0B1232]/50" />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <h1 className="text-lg font-semibold text-white/80">Estimate your income </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/profile")}
                  className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/15 transition"
                  aria-label="Go to profile"
                >
                  <img
                    src="/Bee.svg"
                    alt="bee"
                    className="w-6 h-6"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  {showUpgradeDot && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white/40" />
                  )}
                </button>
                <div className="text-right">
                  <p className="text-xs text-white/80">{username}</p>
                  <div className="mt-1 flex items-center justify-end">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full border ${
                        beeTier === "Golden"
                          ? "bg-amber-400/20 text-amber-200 border-amber-300/50"
                          : beeTier === "Advanced"
                          ? "bg-sky-400/20 text-sky-200 border-sky-300/50"
                          : "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
                      }`}
                    >
                      {beeTier} Bee
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-[2rem] bg-white/15 border border-white/30 backdrop-blur-xl p-5 text-center shadow-2xl">
              <p className="text-sm tracking-wide text-white/80">Earnings Simulator</p>
              <p className="mt-1.5 text-5xl font-bold text-white">{formatMoney(annual)}</p>
              <p className="mt-1 text-white/70">Annual Income</p>

              <div className="mt-4 grid grid-cols-3 items-center text-white">
                <div>
                  <p className="text-2xl font-semibold">{formatMoney(monthly)}</p>
                  <p className="text-xs text-white/70 mt-1">Monthly</p>
                </div>
                <div className="h-10 w-px bg-white/30 mx-auto" />
                <div>
                  <p className="text-2xl font-semibold">{formatMoney(daily)}</p>
                  <p className="text-xs text-white/70 mt-1">Daily</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-white/70">Test income by adjusting parameters!</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pt-4 pb-24">
          <Section title="Bee Type">
            <div className="grid grid-cols-3 gap-3">
              {([
                { tier: "New", icon: "/bee1.png" },
                { tier: "Advanced", icon: "/bee2.png" },
                { tier: "Golden", icon: "/bee3.png" },
              ] as { tier: BeeTier; icon: string }[]).map(({ tier: t, icon }) => (
                <SelectCard
                  key={t}
                  selected={tier === t}
                  label={`${t} Bee`}
                  beeIcon={icon}
                  onClick={() => setTier(t)}
                />
              ))}
            </div>
          </Section>

          <Section title="Body Control">
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  { level: "Low", icon: "/low.svg" },
                  { level: "Medium", icon: "/Medium Control.svg" },
                  { level: "High", icon: "/Hign Control.svg" },
                ] as { level: ControlLevel; icon: string }[]
              ).map(({ level, icon }) => (
                <SelectCard
                  key={level}
                  selected={control === level}
                  label={`${level} Control`}
                  beeIcon={icon}
                  onClick={() => setControl(level)}
                />
              ))}
            </div>
          </Section>

          <Section title="Work Hours per Day">
            <div className="rounded-[1.8rem] bg-white border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>1h</span>
                <span>{hours}h</span>
                <span>12h</span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full accent-[#0B1E5B]"
              />
            </div>
          </Section>
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-[#F5F6F8]/90 backdrop-blur-xl border-t border-gray-200 px-5 py-3 pb-4 rounded-t-[1.6rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22} />} label="Home" onClick={() => router.push("/app")} />
              <NavIcon icon={<Scale size={20} />} label="Earn" active />
              <NavIcon icon={<Wallet size={22} />} label="Work List" onClick={() => router.push("/work-list")} />
              <NavIcon icon={<LayoutGrid size={22} />} label="Task Hub" onClick={() => router.push("/task-hub")} />
              <NavIcon icon={<User size={22} />} label="Profile" onClick={() => router.push("/profile")} showDot={showUpgradeDot} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-center text-[#2D161C] text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}

function SelectCard({
  label,
  beeIcon,
  selected,
  onClick,
}: {
  label: string;
  beeIcon: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[1.6rem] border p-3 text-center shadow-sm transition ${
        selected ? "bg-[#EEF2FF] border-blue-300" : "bg-white border-slate-200"
      }`}
    >
      <div className="w-10 h-10 mx-auto mb-1.5 flex items-center justify-center">
        <img src={beeIcon} alt="bee" className="w-12 h-12 object-contain" />
      </div>
      <p className="text-xs font-semibold text-[#2D161C]">{label}</p>
      <div className="mt-1.5 flex items-center justify-center">
        <div
          className={`w-4 h-4 rounded border ${
            selected ? "bg-blue-500 border-blue-500" : "border-slate-300"
          }`}
        />
      </div>
    </button>
  );
}

function NavIcon({
  icon,
  label,
  active = false,
  showDot = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  showDot?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${
        active ? "text-[#7C71F5] -translate-y-1" : "text-gray-400"
      }`}
    >
      <div className={`${active ? "bg-[#7C71F5]/10 p-2.5 rounded-2xl" : "p-1"} relative`}>
        {icon}
        {showDot && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-white/40" />
        )}
      </div>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}
