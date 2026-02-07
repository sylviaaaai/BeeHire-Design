
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowDownUp,
  ArrowLeft,
  Filter,
  Home,
  LayoutGrid,
  Scale,
  ShoppingCart,
  Send,
  Crown,
  User,
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

// --- 这里是根据截图更新后的数据列?---
const TASKS: Task[] = [
  // Image 1 Content
  {
    id: "stride-01",
    company: "Stride",
    title: "Leave 5-star reviews on Amazon",
    tierRequired: "New",
    hourly: 15.00,
    daysPerWeek: 5, // 截图未显示天数，保持默认逻辑
    hoursPerDay: 2,
    months: 3,
    control: "Low",
    tag: "New Bee Available",
  },
  {
    id: "pastahut-01",
    company: "PastaHut",
    title: "Chopping vegetables (Onions, garlic, basil)",
    tierRequired: "Advanced",
    hourly: 24.00,
    daysPerWeek: 5,
    hoursPerDay: 5,
    months: 3,
    control: "Medium",
    tag: "Advanced Bee",
  },
  {
    id: "hm-01",
    company: "H&M",
    title: "Folding garments to preset orientation",
    tierRequired: "New",
    hourly: 20.00,
    daysPerWeek: 5,
    hoursPerDay: 5,
    months: 2,
    control: "Medium",
    tag: "New Bee Available",
  },
  {
    id: "lego-01",
    company: "LEGO",
    title: "Picking a fixed number of components for each LEGO product",
    tierRequired: "Golden",
    hourly: 48.00,
    daysPerWeek: 5,
    hoursPerDay: 7,
    months: 6,
    control: "High",
    premiumOnly: true,
    tag: "Golden Bee",
  },
  {
    id: "walmart-01",
    company: "Walmart",
    title: "Repeated barcode scanning of warehouse inventory",
    tierRequired: "Advanced",
    hourly: 24.00,
    daysPerWeek: 4,
    hoursPerDay: 5,
    months: 3,
    control: "Medium",
    tag: "Advanced Bee",
  },
  // Image 2 Content
  {
    id: "dove-01",
    company: "Dove",
    title: "Assembly-line screen clicking",
    tierRequired: "New",
    hourly: 15.00,
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
    hourly: 36.00,
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
    hourly: 20.00,
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
    hourly: 36.00,
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
    hourly: 50.00,
    daysPerWeek: 6,
    hoursPerDay: 3,
    months: 1,
    control: "High",
    premiumOnly: true,
    tag: "Golden Bee",
  },
];

const LS = {
  username: "username",
  beeTier: "beeTier", // 可选：New/Advanced/Golden，暂时默?New
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

function logoForCompany(company: string) {
  const map: Record<string, string> = {
    Stride: "/stride.png",
    PastaHut: "/PastaHut.png",
    "H&M": "/hm.png",
    LEGO: "/lego.png",
    Walmart: "/walmart.png",
    Dove: "/Dove.png",
    FedEx: "/fedex.png",
    Nutella: "/Nutella.png",
    "SanitationCo.": "/sanitationCo.png",
    "PicTake.AI": "/PicTake.png",
    Nike: "/nike.png",
    "P&G": "/P&G.png",
    TikTok: "/tiktok.png",
    UPS: "/ups.png",
  };
  return map[company];
}

export default function TaskHubPage() {
  const router = useRouter();

  const [username, setUsername] = useState("Bee");
  const [beeTier, setBeeTier] = useState<BeeTier>("New");
  const [isPremium, setIsPremium] = useState(false);
  const [workDays, setWorkDays] = useState(0);
  const [performance, setPerformance] = useState(0);


  // filters / sort
  const [filterTier, setFilterTier] = useState<"All" | BeeTier>("All");
  const [filterControl, setFilterControl] = useState<"All" | ControlReq>("All");
  const [sortBy, setSortBy] = useState<"bountyDesc" | "bountyAsc">("bountyDesc");

  // local lists
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [applyingIds, setApplyingIds] = useState<string[]>([]);
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const ensureContractAccepted = () => {
    const ca = localStorage.getItem(LS.contractAccepted) === "true";
    if (!ca) {
      router.replace("/contract");
    }
  };

  const syncFromStorage = () => {
    const u = localStorage.getItem(LS.username);
    if (u) setUsername(u);

    const t = (localStorage.getItem(LS.beeTier) as BeeTier) || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);

    const prem = localStorage.getItem(LS.premium) === "true";
    setIsPremium(prem);

    const storedDays = Number(localStorage.getItem("workDays"));
    const storedPerf = Number(localStorage.getItem("performance"));
    setWorkDays(Number.isFinite(storedDays) && storedDays > 0 ? storedDays : 120);
    setPerformance(Number.isFinite(storedPerf) && storedPerf > 0 ? storedPerf : 7.3);

    setCartIds(readList(LS.cart));
    setApplyingIds(readList(LS.applying));
    setApprovedIds(readList(LS.approved));
  };

  useEffect(() => {
    syncFromStorage();
    ensureContractAccepted();

    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (
        e.key === LS.username ||
        e.key === LS.beeTier ||
        e.key === LS.contractAccepted ||
        e.key === LS.cart ||
        e.key === LS.applying ||
        e.key === LS.approved ||
        e.key === LS.premium
      ) {
        syncFromStorage();
        ensureContractAccepted();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("worklist:update", syncFromStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("worklist:update", syncFromStorage);
    };
  }, []);

  const showUpgradeDot = beeTier === "New" && workDays > 90 && performance > 7;

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
    // Tier gate（你也可以选择：不够等级就提示升级?
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

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md bg-[#070F2B] relative flex flex-col h-screen">

        {/* Top bar */}
        <div className="px-6 pt-10 pb-5 text-white shrink-0 relative overflow-hidden">
          <StarField />
          <div className="mb-3">
            <button
              onClick={() => router.push("/app")}
              className="relative z-10 flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">New Tasks</h1>
            </div>

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
                <p className="text-xs text-white/70">{username}</p>
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
          <div className="relative z-10 mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white border border-white/70 rounded-2xl px-3 py-2 flex items-center gap-2 text-[#1B2140]">
              <Filter size={14} className="opacity-80" />
              <select
                value={filterControl}
                onChange={(e) => setFilterControl(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none text-[#1B2140]"
              >
                <option value="All">Control: All</option>
                <option value="Low">Control: Low</option>
                <option value="Medium">Control: Medium</option>
                <option value="High">Control: High</option>
              </select>
            </div>

            <div className="bg-white border border-white/70 rounded-2xl px-3 py-2 flex items-center gap-2 text-[#1B2140]">
              <Crown size={14} className="opacity-80" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none text-[#1B2140]"
              >
                <option value="All">Tier: All</option>
                <option value="New">New Bee</option>
                <option value="Advanced">Advanced Bee</option>
                <option value="Golden">Golden Bee</option>
              </select>
            </div>

            <div className="bg-white border border-white/70 rounded-2xl px-3 py-2 flex items-center gap-2 col-span-2 text-[#1B2140]">
              <ArrowDownUp size={14} className="opacity-80" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent text-sm outline-none text-[#1B2140]"
              >
                <option value="bountyDesc">Sort: Bounty (High to Low)</option>
                <option value="bountyAsc">Sort: Bounty (Low to High)</option>
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
                  onGoPremium={() => router.push("/premium")}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-[#F5F6F8]/90 backdrop-blur-xl border-t border-gray-200 px-5 py-3 pb-4 rounded-t-[1.6rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22} />} label="Home" onClick={() => router.push("/app")} />
              <NavIcon icon={<Scale size={20} />} label="Earn" onClick={() => router.push("/earn")} />
              <NavIcon icon={<Wallet size={22} />} label="Work List" onClick={() => router.push("/work-list")} />
              <NavIcon icon={<LayoutGrid size={22} />} label="Task Hub" active />
              <NavIcon icon={<User size={22} />} label="Profile" onClick={() => router.push("/profile")} showDot={showUpgradeDot} />
            </div>
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
  onGoPremium,
}: {
  task: Task;
  inCart: boolean;
  inApplying: boolean;
  lockedByTier: boolean;
  lockedByPremium: boolean;
  onAddToCart: () => void;
  onApply: () => void;
  onGoPremium: () => void;
}) {
  const primaryLabel = lockedByPremium ? "Go Premium" : "Apply Now";
  const primaryIcon = lockedByPremium ? <Crown size={18} /> : <Send size={18} />;

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className="rounded-[2rem] border border-slate-200 bg-gradient-to-b from-[#F1ECFF] to-[#F7F6FF] shadow-sm overflow-hidden"
    >
      <div className="p-5 flex gap-4">
        {/* Logo */}
        <div className="min-w-[72px]">
          <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
            {logoForCompany(task.company) ? (
              <img
                src={logoForCompany(task.company)}
                alt={task.company}
                className={`object-contain ${
                  task.company === "PicTake.AI"
                    ? "w-[120px] h-[120px]"
                    : task.company === "SanitationCo."
                    ? "w-[90px] h-[90px]"
                    : "w-[60px] h-[60px]"
                }`}
              />
            ) : (
              <span className="text-[10px] text-slate-400 font-bold">LOGO</span>
            )}
          </div>
          <p className="mt-2 text-sm font-bold text-[#1B2140] text-center">{task.company}</p>
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
              onClick={lockedByPremium ? onGoPremium : onApply}
              disabled={inApplying || (lockedByTier && !lockedByPremium)}
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

function NavIcon({
  icon,
  label,
  active = false,
  onClick,
  showDot = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  showDot?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${
        active ? "text-[#7C71F5] -translate-y-1" : "text-gray-400"
      }`}
    >
      <div className={`relative ${active ? "bg-[#7C71F5]/10 p-2.5 rounded-2xl" : "p-1"}`}>
        {icon}
        {showDot && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white/60" />
        )}
      </div>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}






