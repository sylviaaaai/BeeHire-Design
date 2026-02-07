
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowDownUp,
  ArrowLeft,
  Filter,
  ShoppingCart,
  Send,
  Crown,
  Wallet,
} from "lucide-react";

type BeeTier = "New" | "Advanced" | "Golden";
type ControlReq = "Low" | "Medium" | "High";

type Task = {
  id: string;
  company: string;
  title: string;
  tierRequired: BeeTier;
  hourly: number;
  daysPerWeek: number;
  hoursPerDay: number;
  months: number;
  control: ControlReq;
  premiumOnly?: boolean;
  tag?: string; // e.g. "New Bee Available"
};

const TASKS: Task[] = [
  {
    id: "dove-01",
    company: "Dove",
    title: "Assembly-line screen clicking",
    tierRequired: "New",
    hourly: 15,
    daysPerWeek: 5,
    hoursPerDay: 6,
    months: 2,
    control: "Low",
    tag: "New Bee Available",
  },
  {
    id: "fedex-01",
    company: "FedEx",
    title: "Loading parcels onto a conveyor belt",
    tierRequired: "Advanced",
    hourly: 36,
    daysPerWeek: 5,
    hoursPerDay: 5,
    months: 3,
    control: "High",
    tag: "Advanced Bee",
  },
  {
    id: "nutella-01",
    company: "Nutella",
    title: "Feeding materials into chocolate machines at fixed intervals",
    tierRequired: "New",
    hourly: 20,
    daysPerWeek: 6,
    hoursPerDay: 8,
    months: 2,
    control: "Medium",
    tag: "New Bee Available",
  },
  {
    id: "sanitation-01",
    company: "SanitationCo.",
    title: "Collecting trash bins along assigned streets",
    tierRequired: "Advanced",
    hourly: 36,
    daysPerWeek: 5,
    hoursPerDay: 7,
    months: 4,
    control: "High",
    tag: "Advanced Bee",
  },
  {
    id: "pictake-01",
    company: "PicTake.AI",
    title: "Walk along the street and take random photos every 10 seconds",
    tierRequired: "Golden",
    hourly: 50,
    daysPerWeek: 6,
    hoursPerDay: 3,
    months: 1,
    control: "High",
    premiumOnly: true,
    tag: "Premium Bee",
  },
  // 你想扩充就继续按这个格式加
];

const LS = {
  username: "username",
  beeTier: "beeTier", // 可选：New/Advanced/Golden，暂时默认 New
  contractAccepted: "contractAccepted",
  cart: "workCart",
  applying: "workApplying",
  approved: "workApproved",
  premium: "isPremium",
};

function tierRank(t: BeeTier) {
  return t === "New" ? 0 : t === "Advanced" ? 1 : 2;
}

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: string[]) {
  localStorage.setItem(key, JSON.stringify(Array.from(new Set(list))));
}

function pillColorForTier(tier: BeeTier) {
  if (tier === "Golden") return "bg-[#9B8A18] text-white";
  if (tier === "Advanced") return "bg-[#6B5A46] text-white";
  return "bg-[#6E8A74] text-white";
}

function pillColorForControl(c: ControlReq) {
  if (c === "High") return "text-cyan-500";
  if (c === "Medium") return "text-slate-500";
  return "text-slate-400";
}

export default function TaskHubPage() {
  const router = useRouter();

  const [username, setUsername] = useState("Bee");
  const [beeTier, setBeeTier] = useState<BeeTier>("New");
  const [isPremium, setIsPremium] = useState(false);

  const [contractAccepted, setContractAccepted] = useState(false);

  // filters / sort
  const [filterTier, setFilterTier] = useState<"All" | BeeTier>("All");
  const [filterControl, setFilterControl] = useState<"All" | ControlReq>("All");
  const [sortBy, setSortBy] = useState<"bountyDesc" | "bountyAsc">("bountyDesc");

  // local lists
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [applyingIds, setApplyingIds] = useState<string[]>([]);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  useEffect(() => {
    const u = localStorage.getItem(LS.username);
    if (u) setUsername(u);

    const t = (localStorage.getItem(LS.beeTier) as BeeTier) || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);

    const prem = localStorage.getItem(LS.premium) === "true";
    setIsPremium(prem);

    const ca = localStorage.getItem(LS.contractAccepted) === "true";
    setContractAccepted(ca);

    setCartIds(readList(LS.cart));
    setApplyingIds(readList(LS.applying));
    setApprovedIds(readList(LS.approved));
  }, []);

  const visibleTasks = useMemo(() => {
    let arr = [...TASKS];

    if (filterTier !== "All") arr = arr.filter((x) => x.tierRequired === filterTier);
    if (filterControl !== "All") arr = arr.filter((x) => x.control === filterControl);

    arr.sort((a, b) => {
      const diff = a.hourly - b.hourly;
      return sortBy === "bountyAsc" ? diff : -diff;
    });

    return arr;
  }, [filterTier, filterControl, sortBy]);

  const onContinueContract = () => {
    localStorage.setItem(LS.contractAccepted, "true");
    setContractAccepted(true);
  };

  const addToCart = (taskId: string) => {
    const next = Array.from(new Set([...cartIds, taskId]));
    setCartIds(next);
    writeList(LS.cart, next);
  };

  const applyNow = (task: Task) => {
    // Premium gate
    if (task.premiumOnly && !isPremium) {
      router.push("/premium");
      return;
    }
    // Tier gate（你也可以选择：不够等级就提示升级）
    if (tierRank(beeTier) < tierRank(task.tierRequired)) {
      // 先做一个轻提示（不做复杂弹窗）
      alert(`This job requires ${task.tierRequired} Bee access.`);
      return;
    }

    const nextApplying = Array.from(new Set([...applyingIds, task.id]));
    setApplyingIds(nextApplying);
    writeList(LS.applying, nextApplying);
  };

  const goWorkList = () => router.push("/work-list");

  // 首次进入：合同页覆盖
  if (!contractAccepted) {
    return (
      <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
        <div className="w-full max-w-md h-screen relative">
          <div className="h-full w-full flex flex-col">
            <div className="px-6 pt-10 pb-6 text-white">
              <h1 className="text-2xl font-bold tracking-tight">Task Hub</h1>
              <p className="text-white/60 text-sm mt-1">
                Before you browse, please review your contract.
              </p>
            </div>

            <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 min-h-[420px] flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#2D161C]">Contract</h2>
                  <p className="text-slate-500 text-sm mt-2">
                    (Placeholder) Contract content is being finalized.
                  </p>

                  <div className="mt-6 h-64 rounded-2xl bg-white border border-slate-200" />
                </div>

                <button
                  onClick={onContinueContract}
                  className="mt-6 w-full py-4 rounded-2xl bg-[#070F2B] text-white font-bold shadow-xl active:scale-95 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md bg-[#070F2B] relative flex flex-col h-screen">

        {/* Top bar */}
        <div className="px-6 pt-10 pb-5 text-white shrink-0">
          <div className="mb-3">
            <button
              onClick={() => router.push("/app")}
              className="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">New Tasks</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <img
                  src="/Bee.svg"
                  alt="bee"
                  className="w-6 h-6"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">{username}</p>
                <button
                  onClick={goWorkList}
                  className="text-[11px] font-bold text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/70 transition"
                >
                  My work list
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/10 border border-white/15 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Filter size={14} className="opacity-80" />
              <select
                value={filterControl}
                onChange={(e) => setFilterControl(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none"
              >
                <option value="All">Control: All</option>
                <option value="Low">Control: Low</option>
                <option value="Medium">Control: Medium</option>
                <option value="High">Control: High</option>
              </select>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl px-3 py-2 flex items-center gap-2">
              <Crown size={14} className="opacity-80" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none"
              >
                <option value="All">Tier: All</option>
                <option value="New">New Bee</option>
                <option value="Advanced">Advanced Bee</option>
                <option value="Golden">Golden Bee</option>
              </select>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-2xl px-3 py-2 flex items-center gap-2 col-span-2">
              <ArrowDownUp size={14} className="opacity-80" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none"
              >
                <option value="bountyDesc">Sort: Bounty (High → Low)</option>
                <option value="bountyAsc">Sort: Bounty (Low → High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* List area */}
        <div className="flex-1 bg-white rounded-t-[2.5rem] px-5 pt-6 pb-28 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="space-y-4">
            {visibleTasks.map((task) => {
              const inCart = cartIds.includes(task.id);
              const inApplying = applyingIds.includes(task.id);
              const lockedByTier = tierRank(beeTier) < tierRank(task.tierRequired);
              const lockedByPremium = !!task.premiumOnly && !isPremium;

              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  inCart={inCart}
                  inApplying={inApplying}
                  lockedByTier={lockedByTier}
                  lockedByPremium={lockedByPremium}
                  onAddToCart={() => addToCart(task.id)}
                  onApply={() => applyNow(task)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

function TaskCard({
  task,
  inCart,
  inApplying,
  lockedByTier,
  lockedByPremium,
  onAddToCart,
  onApply,
}: {
  task: Task;
  inCart: boolean;
  inApplying: boolean;
  lockedByTier: boolean;
  lockedByPremium: boolean;
  onAddToCart: () => void;
  onApply: () => void;
}) {
  const primaryLabel = lockedByPremium ? "Go Premium" : "Apply Now";
  const primaryIcon = lockedByPremium ? <Crown size={18} /> : <Send size={18} />;

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="rounded-[2rem] border border-slate-200 bg-gradient-to-b from-[#F1ECFF] to-[#F7F6FF] shadow-sm overflow-hidden"
    >
      <div className="p-5 flex gap-4">
        {/* Logo placeholder */}
        <div className="min-w-[72px]">
          <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-slate-200" />
          <p className="mt-2 text-sm font-bold text-[#1B2140]">{task.company}</p>
        </div>

        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-[#1B2140] leading-snug">
            {task.company} {task.title.toLowerCase().includes(task.company.toLowerCase()) ? "" : " "}
            {task.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {task.tag && (
              <span className={`text-[11px] px-3 py-1 rounded-full ${pillColorForTier(task.tierRequired)}`}>
                {task.tag}
              </span>
            )}
            <span className="text-[11px] px-3 py-1 rounded-full bg-slate-400/70 text-white">
              {task.hoursPerDay} hrs/day
            </span>
          </div>

          <div className="mt-3 text-[13px] text-slate-600 flex flex-wrap gap-x-6 gap-y-1">
            <p>
              Bounty: <span className="font-bold text-emerald-700">${task.hourly.toFixed(2)} / hr</span>
            </p>
            <p>
              Control Requirement:{" "}
              <span className={`font-bold ${pillColorForControl(task.control)}`}>{task.control}</span>
            </p>
            <p className="text-[12px] text-slate-500">
              {task.daysPerWeek} days/week · {task.months} month(s)
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={onAddToCart}
              disabled={inCart}
              className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition
                ${inCart ? "bg-slate-100 text-slate-400 border-slate-200" : "bg-white text-[#1B2140] border-slate-200 hover:bg-slate-50"}
              `}
            >
              <ShoppingCart size={18} />
              {inCart ? "In Cart" : "Add to Cart"}
            </button>

            <button
              onClick={onApply}
              disabled={inApplying || lockedByTier}
              className={`py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition
                ${
                  lockedByTier
                    ? "bg-slate-200 text-slate-500"
                    : lockedByPremium
                    ? "bg-[#9B8A18] text-white hover:brightness-105"
                    : "bg-[#070F2B] text-white hover:bg-[#0A163B]"
                }
                ${inApplying ? "opacity-60" : ""}
              `}
              title={lockedByTier ? `Requires ${task.tierRequired} Bee` : ""}
            >
              {primaryIcon}
              {inApplying ? "Applying..." : lockedByTier ? "Locked" : primaryLabel}
            </button>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
            <Wallet size={14} className="opacity-60" />
            <span>
              {task.premiumOnly ? "Premium-only application (can still add to cart)" : "Instant apply available"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
