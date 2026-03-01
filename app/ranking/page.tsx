"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Medal, Star } from "lucide-react";
import { useRouter } from "next/navigation";

type RankEntry = {
  rank: number;
  beeId: string;
  name: string;
  title: string;
  totalIncome: number;
  avatarImage: string;
};

const TOP_THREE: RankEntry[] = [
  {
    rank: 2,
    beeId: "20273710",
    name: "Night Shift",
    title: "Golden Bee",
    totalIncome: 970102,
    avatarImage: "/2.png",
  },
  {
    rank: 1,
    beeId: "20266998",
    name: "Bee King",
    title: "Golden Bee",
    totalIncome: 1000295,
    avatarImage: "/1.png",
  },
  {
    rank: 3,
    beeId: "20302114",
    name: "Luna Bee",
    title: "Golden Bee",
    totalIncome: 910020,
    avatarImage: "/3.png",
  },
];

const LEADERBOARD: RankEntry[] = [
  { rank: 4, beeId: "20283394", name: "Mason", title: "Golden Bee", totalIncome: 900893, avatarImage: "/4.png" },
  { rank: 5, beeId: "20307420", name: "Orion", title: "Golden Bee", totalIncome: 890145, avatarImage: "/5.png" },
  { rank: 6, beeId: "20314840", name: "Ethan", title: "Golden Bee", totalIncome: 886729, avatarImage: "/6.png" },
  { rank: 7, beeId: "20339899", name: "Ivy", title: "Golden Bee", totalIncome: 875521, avatarImage: "/7.png" },
  { rank: 8, beeId: "20280386", name: "Skye", title: "Golden Bee", totalIncome: 847480, avatarImage: "/8.png" },
  { rank: 9, beeId: "20294758", name: "Nova", title: "Golden Bee", totalIncome: 805494, avatarImage: "/9.png" },
  { rank: 10, beeId: "20339007", name: "Nina", title: "Golden Bee", totalIncome: 798273, avatarImage: "/10.png" },
];

const CURRENT_USER = {
  percentile: 95,
  beeId: "20362970",
  totalIncome: 11180,
};

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function TopAvatar({ src, large = false }: { src: string; large?: boolean }) {
  const sizeClass = large ? "w-16 h-16" : "w-12 h-12";

  return (
    <div className={`rounded-[1.2rem] border border-white/60 bg-white/95 shadow-inner overflow-hidden ${sizeClass}`}>
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function TableAvatar({ src }: { src: string }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

export default function RankingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen bg-[#070F2B] relative overflow-hidden">
          <div
            className="relative z-10 px-5 pt-8 pb-6 overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(12,17,58,0.18) 0%, rgba(12,17,58,0.3) 52%, rgba(7,15,43,1) 100%), url(/bg-Earn.png)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
          <div className="absolute inset-0 pointer-events-none">
            <Star className="absolute top-4 left-4 text-[#FFD764] fill-[#FFD764] drop-shadow-[0_0_12px_rgba(255,215,100,0.8)]" size={30} />
            {Array.from({ length: 70 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#FFF7CB]"
                style={{
                  width: `${(i % 3) + 1}px`,
                  height: `${(i % 3) + 1}px`,
                  top: `${(i * 9) % 100}%`,
                  left: `${(i * 17) % 100}%`,
                  boxShadow: "0 0 10px rgba(255,240,179,0.9)",
                  opacity: 0.65,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="relative z-10 inline-flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="relative z-10 mt-6 text-center text-white">
            <p className="text-[22px] font-black uppercase tracking-[0.25em] text-[#F6E7A8]/80">Global Ranking</p>
          </div>

          <div className="relative z-10 mt-12 flex items-end justify-center gap-2">
            {TOP_THREE.map((entry) => {
              const featured = entry.rank === 1;

              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: entry.rank * 0.08 }}
                  className={`relative shrink-0 rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(157,173,234,0.18))] text-white shadow-[0_20px_40px_rgba(8,12,41,0.35)] backdrop-blur-md ${
                    featured ? "w-[44%] min-w-0 px-3 py-3.5" : "w-[27%] min-w-0 px-2.5 py-2.5"
                  }`}
                >
                  <p
                    className={`absolute left-1/2 -translate-x-1/2 font-black text-[#FFD64D] drop-shadow-[0_6px_12px_rgba(10,12,38,0.45)] ${
                      featured ? "-top-14 text-[3rem]" : "-top-10 text-[2rem]"
                    }`}
                  >
                    #{entry.rank}
                  </p>
                  <div className="absolute inset-x-3 top-2 h-12 rounded-full bg-white/12 blur-xl" />
                  <div className="text-center">
                    <div className="mt-1 flex justify-center -mb-5">
                      <img
                        src="/12.png"
                        alt="Bee King badge"
                        className={`${featured ? "h-20 w-auto" : "h-16 w-auto"}`}
                      />
                    </div>
                    <div className="mt-0 flex justify-center">
                      <TopAvatar src={entry.avatarImage} large={featured} />
                    </div>
                    <p className={`mt-2 font-semibold text-white/75 ${featured ? "text-[10px]" : "text-[9px]"}`}>ID: {entry.beeId}</p>
                    <div className={`mt-1.5 inline-flex rounded-full bg-[#D6B21D] font-semibold text-[#FFF8D8] ${featured ? "px-3 py-1 text-[10px]" : "px-2.5 py-1 text-[9px]"}`}>
                      {entry.title}
                    </div>
                    <p
                      className={`mt-3 font-black text-[#FFF2D7] leading-none ${featured ? "text-[1.95rem] -ml-2 tracking-[-0.05em]" : "text-[1rem] tracking-tight"}`}
                    >
                      {formatMoney(entry.totalIncome)}
                    </p>
                    <p className={`text-white/75 ${featured ? "text-[10px]" : "text-[9px]"}`}>Total Income</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 rounded-t-[2.75rem] bg-[#F7F7FB] px-5 pt-6 pb-28 shadow-[0_-18px_50px_rgba(0,0,0,0.35)]">
          <div className="rounded-[2rem] bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-[72px_1fr_120px] bg-slate-200/90 px-4 py-3 text-[13px] font-semibold text-slate-500">
              <span>Ranking</span>
              <span>Bee ID</span>
              <span className="text-right">Total Earnings</span>
            </div>

            <div className="px-4 py-2">
              {LEADERBOARD.map((entry) => (
                <div
                    key={entry.rank}
                    className="grid grid-cols-[72px_1fr_120px] items-center gap-2 py-3 border-b border-slate-100 last:border-b-0"
                >
                  <div className="text-center text-2xl font-bold text-[#39306F]">{entry.rank}</div>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src="/bee3.png" alt="" className="h-6 w-6 shrink-0 object-contain" />
                    <TableAvatar src={entry.avatarImage} />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-[#44377A]">{entry.beeId}</p>
                      <p className="truncate text-[12px] text-slate-500">{entry.name}</p>
                    </div>
                  </div>
                  <div className="text-right text-[15px] font-bold text-[#4D4A76]">{formatMoney(entry.totalIncome)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 text-center">
            <p className="text-[17px] font-black text-[#37328B]">You are in the Top {CURRENT_USER.percentile}%, Keep Working!</p>
          </div>

          <div className="mt-4 rounded-[1.6rem] border border-[#BED6A6] bg-[#EEF5E8] px-4 py-4 shadow-sm">
            <div className="grid grid-cols-[64px_1fr_auto] items-center gap-3">
              <div className="text-xl font-black text-[#4F5A2A]">{CURRENT_USER.percentile}%</div>
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#D5E3C8] flex items-center justify-center overflow-hidden">
                  <img src="/bee2.png" alt="Bee" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-[#44512F]">{CURRENT_USER.beeId}</p>
                  <p className="text-[12px] text-[#6D7B53]">Current personal standing</p>
                </div>
              </div>
              <div className="text-right text-[16px] font-black text-[#4B4F6A]">{formatMoney(CURRENT_USER.totalIncome)}</div>
            </div>
          </div>

          <div
            className="mt-6 rounded-[2rem] border-2 border-[#B8B29F] px-4 py-5 shadow-sm overflow-hidden relative"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,253,247,0.72), rgba(255,249,236,0.74)), url(/background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-80">
              {Array.from({ length: 42 }).map((_, i) => (
                <span
                  key={i}
                  className={`absolute ${i % 5 === 0 ? "text-[#E5C14A]" : i % 3 === 0 ? "text-[#B8DAD2]" : "text-[#D9D6F6]"}`}
                  style={{
                    top: `${(i * 13) % 100}%`,
                    left: `${(i * 19) % 100}%`,
                    fontSize: `${10 + (i % 3) * 4}px`,
                    transform: `rotate(${i * 17}deg)`,
                  }}
                >
                  {i % 7 === 0 ? "$" : i % 4 === 0 ? "*" : "."}
                </span>
              ))}
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="relative w-[42%] min-w-[132px] h-32 shrink-0">
                <img
                  src="/lego.png"
                  alt="Lego prize"
                  className="absolute left-0 top-5 h-24 w-20 rounded-xl border-2 border-[#6C2200] bg-white object-cover shadow-[0_10px_20px_rgba(102,53,7,0.18)]"
                />
                <img
                  src="/11.png"
                  alt="Device prize"
                  className="absolute left-[4.5rem] top-7 h-24 w-20 rotate-[7deg] rounded-xl border-2 border-white bg-white object-cover shadow-[0_14px_28px_rgba(109,74,182,0.22)]"
                />
              </div>

              <div className="flex-1 pr-2">
                <h2 className="text-[20px] leading-[1.15] font-black tracking-[-0.02em] text-[#BF7722]">
                  Join Bee Competition
                  <br />
                  to Win Big Prizes!
                </h2>
                <div className="mt-3 space-y-1 text-[10px] font-semibold text-[#D08A34]">
                  <p>- Extra Bounties!</p>
                  <p>- 2 Month Memberships!</p>
                  <p>- Upgraded Safer Device!</p>
                </div>
                <p className="mt-4 text-[10px] leading-snug text-[#CC9B55]">
                  *Top 10% Bees will enter a monthly lottery automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/task-hub")}
              className="inline-flex items-center gap-2 rounded-full bg-[#070F2B] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#070F2B]/20"
            >
              <Medal size={16} />
              Work More to Climb
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
