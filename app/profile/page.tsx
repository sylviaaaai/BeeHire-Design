"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LayoutGrid, Scale, User, Wallet } from "lucide-react";
import { motion } from "framer-motion";

type BeeTier = "New" | "Advanced" | "Golden";

const LS = {
  username: "username",
  beeTier: "beeTier",
  contractAccepted: "contractAccepted",
};

type TabKey = "status" | "earnings";

const STATUS_ITEMS = [
  {
    title: "Congratulations!",
    body: "You ranked in the top 10% of the most hard-working bees this month.",
  },
  {
    title: "Work Performance",
    body: "Mismatch between assigned task complexity and sleep state resulted in suboptimal execution quality.",
    score: "7.3",
    delta: "-0.3",
  },
  {
    title: "You didn't work enough!",
    body: "Warning: Due to insufficient working time, the assigned task was not completed within the required progress window.",
    penalty: "-$10.00",
  },
];

const EARNINGS_LIST = [
  { title: "Nike", time: "10:27 - Feb 11", value: "+$55.40", color: "text-emerald-600" },
  { title: "P&G", time: "10:28 - Feb 11", value: "+$37.89", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Feb 11", value: "-$10.00", color: "text-rose-600" },
  { title: "Coca Cola", time: "10:27 - Feb 10", value: "+$30.40", color: "text-emerald-600" },
  { title: "FedEx", time: "10:28 - Feb 9", value: "+$60.89", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Feb 8", value: "-$5.00", color: "text-rose-600" },
  { title: "Walmart", time: "10:28 - Feb 7", value: "+$78.02", color: "text-emerald-600" },
  { title: "Nutella", time: "10:26 - Feb 6", value: "+$26.10", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Feb 5", value: "-$8.00", color: "text-rose-600" },
  { title: "Dove", time: "10:27 - Feb 4", value: "+$41.75", color: "text-emerald-600" },
  { title: "Walmart", time: "10:28 - Feb 3", value: "+$62.30", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Feb 2", value: "-$12.00", color: "text-rose-600" },
  { title: "FedEx", time: "10:27 - Feb 1", value: "+$59.20", color: "text-emerald-600" },
  { title: "Stride", time: "10:28 - Jan 31", value: "+$18.50", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Jan 30", value: "-$6.00", color: "text-rose-600" },
  { title: "PastaHut", time: "10:27 - Jan 29", value: "+$33.10", color: "text-emerald-600" },
  { title: "H&M", time: "10:28 - Jan 28", value: "+$22.40", color: "text-emerald-600" },
  { title: "Penalty", time: "10:29 - Jan 27", value: "-$7.50", color: "text-rose-600" },
];

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("Bee");
  const [beeTier, setBeeTier] = useState<BeeTier>("New");
  const [tab, setTab] = useState<TabKey>("status");
  const [workDays, setWorkDays] = useState(0);
  const [performance, setPerformance] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem(LS.username);
    if (u) setUsername(u);
    const t = (localStorage.getItem(LS.beeTier) as BeeTier) || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);
    const storedDays = Number(localStorage.getItem("workDays"));
    const storedPerf = Number(localStorage.getItem("performance"));
    setWorkDays(Number.isFinite(storedDays) && storedDays > 0 ? storedDays : 120);
    setPerformance(Number.isFinite(storedPerf) && storedPerf > 0 ? storedPerf : 7.3);
  }, []);

  const today = useMemo(() => formatDate(new Date()), []);
  const showUpgradeDot = beeTier === "New" && workDays > 90 && performance > 7;

  const onTerms = () => {
    router.push("/contract?from=profile");
  };

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen relative">
        {/* Header */}
        <div className="px-6 pt-10 pb-6 text-white relative overflow-hidden">
          <StarField />
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Profile Overview</h1>
            <span className="text-xs text-white/70">{today}</span>
          </div>
        </div>

        {/* Profile card */}
        <div className="px-6">
          <div className="rounded-[2rem] bg-[#5B5F86] text-white p-5 border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center relative">
                <img src="/Bee.svg" alt="bee" className="w-8 h-8" />
                {showUpgradeDot && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white/40" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-lg font-bold">{username}</p>
                  <button
                    onClick={() => router.push("/premium")}
                    className="px-2 py-0.5 rounded-full bg-white/20 text-[11px] font-semibold relative"
                  >
                    Upgrade
                    {showUpgradeDot && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white/40" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-white/80">Member for 260 days</p>
                <p
                  className={`text-xs mt-1 ${
                    beeTier === "Golden"
                      ? "text-amber-300"
                      : beeTier === "Advanced"
                      ? "text-sky-300"
                      : "text-emerald-300"
                  }`}
                >
                  *{beeTier} Bee
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 items-center text-center">
              <div>
                <p className="text-[10px] text-white/70">Total Earnings</p>
                <p className="text-xl font-bold mt-1">$11,180</p>
              </div>
              <div className="h-8 w-px bg-white/30 mx-auto" />
              <div>
                <p className="text-[10px] text-white/70">Total Penalties</p>
                <p className="text-xl font-bold mt-1">$320</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 px-6">
          <div className="rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="grid grid-cols-2 text-center text-sm font-bold text-[#2D161C] border-b border-slate-200">
              <button
                onClick={() => setTab("status")}
                className={`py-3 ${tab === "status" ? "bg-white" : "bg-slate-50 text-slate-500"}`}
              >
                Account Status
              </button>
              <button
                onClick={() => setTab("earnings")}
                className={`py-3 ${tab === "earnings" ? "bg-white" : "bg-slate-50 text-slate-500"}`}
              >
                Earnings
              </button>
            </div>

            <div className="p-5">
              {tab === "status" ? (
                <div className="space-y-4">
                  <StatusCard
                    title={STATUS_ITEMS[0].title}
                    body={STATUS_ITEMS[0].body}
                    tone="gold"
                    showBg
                  />
                  <StatusCard
                    title={STATUS_ITEMS[1].title}
                    body={STATUS_ITEMS[1].body}
                    score={STATUS_ITEMS[1].score}
                    delta={STATUS_ITEMS[1].delta}
                    tone="blue"
                  />
                  <StatusCard
                    title={STATUS_ITEMS[2].title}
                    body={STATUS_ITEMS[2].body}
                    penalty={STATUS_ITEMS[2].penalty}
                    tone="rose"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm font-bold text-[#2D161C]">2026-Feb</div>
                  <div className="space-y-3">
                    {EARNINGS_LIST.map((item) => (
                      <EarningRow
                        key={`${item.title}-${item.time}`}
                        title={item.title}
                        time={item.time}
                        value={item.value}
                        color={item.color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="px-6 mt-6 mb-28 text-center">
          <button onClick={onTerms} className="text-sm text-slate-300 underline underline-offset-4">
            Terms and Conditions
          </button>
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-[#F5F6F8]/90 backdrop-blur-xl border-t border-gray-200 px-5 py-3 pb-4 rounded-t-[1.6rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22} />} label="Home" onClick={() => router.push("/app")} />
              <NavIcon icon={<Scale size={20} />} label="Earn" onClick={() => router.push("/earn")} />
              <NavIcon icon={<Wallet size={22} />} label="Work List" onClick={() => router.push("/work-list")} />
              <NavIcon icon={<LayoutGrid size={22} />} label="Task Hub" onClick={() => router.push("/task-hub")} />
              <NavIcon icon={<User size={22} />} label="Profile" active showDot={showUpgradeDot} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

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

function StatusCard({
  title,
  body,
  score,
  delta,
  penalty,
  tone,
  showBg = false,
}: {
  title: string;
  body: string;
  score?: string;
  delta?: string;
  penalty?: string;
  tone: "gold" | "blue" | "rose";
  showBg?: boolean;
}) {
  const toneClass =
    tone === "gold"
      ? "border-[#D9C37A] bg-[#FFF8E8]"
      : tone === "blue"
      ? "border-[#CDD3E6] bg-[#F2F4FF]"
      : "border-[#E6C2C2] bg-[#FFF4F4]";

  return (
    <div
      className={`rounded-[1.8rem] border p-4 ${toneClass}`}
      style={
        showBg
          ? {
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(/background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-[#2D161C]">{title}</p>
          <p className="text-xs text-slate-600 mt-2">{body}</p>
        </div>
        {score && (
          <div className="text-right">
            <div className="text-3xl font-bold text-[#1B2140]">{score}</div>
            <div className="text-xs text-rose-600">{delta}</div>
          </div>
        )}
        {penalty && (
          <div className="text-right">
            <div className="text-2xl font-bold text-rose-700">{penalty}</div>
          </div>
        )}
      </div>
      <button className="mt-3 w-full rounded-full bg-[#2D1A5B] text-white py-2 text-sm font-bold">
        Improve by working more!
      </button>
    </div>
  );
}

function EarningRow({
  title,
  time,
  value,
  color,
}: {
  title: string;
  time: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
            title === "Penalty" ? "bg-rose-500" : "bg-yellow-400"
          }`}
        >
          $$
        </div>
        <div>
          <p className="text-sm font-bold text-[#1B2140]">{title}</p>
          <p className="text-xs text-blue-600">{time}</p>
        </div>
      </div>
      <div className={`text-sm font-bold ${color}`}>{value}</div>
    </div>
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
