"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Play, 
  Home, 
  LayoutGrid, 
  Scale,
  User, 
  ArrowUpRight, 
  Wallet,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
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

// --- 2. 主页�?---
export default function DashboardPage() {
  const [username, setUsername] = useState("Bee");
  const [today, setToday] = useState("");
  const [beeTier, setBeeTier] = useState<"New" | "Advanced" | "Golden">("New");
  const [workDays, setWorkDays] = useState(0);
  const [performance, setPerformance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);

    const t = (localStorage.getItem("beeTier") as "New" | "Advanced" | "Golden") || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);
    const storedDays = Number(localStorage.getItem("workDays"));
    const storedPerf = Number(localStorage.getItem("performance"));
    setWorkDays(Number.isFinite(storedDays) && storedDays > 0 ? storedDays : 120);
    setPerformance(Number.isFinite(storedPerf) && storedPerf > 0 ? storedPerf : 7.3);

    const now = new Date();
    const formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    setToday(formatted);
  }, []);

  const showUpgradeDot = beeTier === "New" && workDays > 90 && performance > 7;

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased overflow-hidden">
      <div className="w-full max-w-md bg-[#070F2B] relative flex flex-col h-screen">

        {/* === 顶部星空区域 === */}
        <div className="px-6 pt-8 pb-8 text-white relative overflow-hidden shrink-0">

          <StarField />

          {/* 欢迎�?*/}
          <div className="relative z-10 flex items-center gap-3 mb-5">
            <button
              onClick={() => router.push("/profile")}
              className="relative w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm hover:bg-white/15 transition"
              aria-label="Go to profile"
            >
              <img src="/Bee.svg" className="w-7 h-7" alt="logo" />
              {showUpgradeDot && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white/40" />
              )}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white/90 text-xs font-medium tracking-wide">
                  Hi, {username}
                </p>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                    beeTier === "Golden"
                      ? "bg-amber-400/20 text-amber-200 border-amber-300/50"
                      : beeTier === "Advanced"
                      ? "bg-sky-400/20 text-sky-200 border-sky-300/50"
                      : "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                  }`}
                >
                  {beeTier} Bee
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
            </div>
          </div>

          {/* 工作时间卡片 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-5 mb-5 border border-white/25 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-center gap-2 mb-1.5 opacity-50">
                <Clock size={14} />
                <p className="text-[10px] uppercase tracking-widest">
                  {today}
                </p>
            </div>
            <p className="text-white/90 text-sm font-medium mb-0.5">
              Total Work Hours
            </p>
            <h2 className="text-5xl font-bold tracking-tighter drop-shadow-lg">
              05<span className="text-2xl opacity-60 ml-1">h</span>{" "}
              23<span className="text-2xl opacity-60 ml-1">m</span>{" "}
              56<span className="text-sm opacity-60 ml-1">s</span>
            </h2>
          </motion.div>

          {/* 收入 */}
          <div className="relative z-10 flex justify-between px-2 mb-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                  Overnight
                </p>
                <p className="text-xl font-bold flex items-center gap-1">
                  $43.29
                  <ArrowUpRight size={14} className="text-emerald-400" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                  Weekly
                </p>
                <p className="text-xl font-bold">$203.12</p>
              </div>
            </div>
          </div>
        </div>

        {/* === 白色内容区域 === */}
        <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-4 pb-28 overflow-y-auto relative z-20 -mt-4">

          <h3 className="text-center text-[#2D161C] text-lg font-bold mb-4">
            Your Current Contract
          </h3>

          <div className="space-y-3">
            <TaskCard 
              brand="Nike"
              title="Workshop process sampling & material handling"
              stipend="$27.70"
              requirement="High"
              days="5 days/week"
              progress={67}
            />

            <TaskCard 
              brand="P&G"
              title="Packaging defect detection & visual checks"
              stipend="$18.20"
              requirement="Medium"
              days="3 days/week"
              progress={20}
            />

            <TaskCard 
              brand="TikTok"
              title="Sponsored post interaction alignment"
              stipend="$14.00"
              requirement="Low"
              isAwaiting
            />
          </div>

          {/* Add More */}
          <div className="mt-6 pb-3">
            <button onClick={() => router.push("/task-hub")} className="w-full flex items-center justify-center gap-3 
              bg-[#070F2B] text-white py-4 rounded-2xl font-bold 
              shadow-xl shadow-blue-900/30 active:scale-95 transition hover:bg-[#0A163B]">
              <Plus size={22} />
              Add More
            </button>
          </div>

        </div>

        {/* === 底部导航�?=== */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-[#F5F6F8]/90 backdrop-blur-xl border-t border-gray-200 px-5 py-3 pb-4 rounded-t-[1.6rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22}/>} label="Home" active />
              <NavIcon icon={<Scale size={20}/>} label="Earn" onClick={() => router.push("/earn")} />
              <NavIcon icon={<Wallet size={22}/>} label="Work List" onClick={() => router.push("/work-list")} />
              <NavIcon icon={<LayoutGrid size={22}/>} label="Task Hub" onClick={() => router.push("/task-hub")} />
              <NavIcon icon={<User size={22}/>} label="Profile" onClick={() => router.push("/profile")} showDot={showUpgradeDot} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- TaskCard ---
function logoForBrand(brand: string) {
  const map: Record<string, string> = {
    Nike: "/nike.png",
    "P&G": "/P&G.png",
    TikTok: "/tiktok.png",
  };
  return map[brand];
}

function TaskCard({ brand, title, stipend, requirement, days, progress, isAwaiting }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-[#EBE5EB] rounded-[1.8rem] p-4 flex gap-3 items-start"
    >
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
        {logoForBrand(brand) ? (
          <img src={logoForBrand(brand)} alt={brand} className="w-8 h-8 object-contain" />
        ) : (
          <span className="font-bold text-xs">{brand}</span>
        )}
      </div>

      <div className="flex-1">
        <h4 className="text-[13px] font-bold mb-1">{title}</h4>

        <div className="flex flex-wrap gap-x-3 text-[10px] mb-2">
          <p>Stipend: <b>{stipend} / hr</b></p>
          <p>Req: <b>{requirement}</b></p>
        </div>

        {isAwaiting ? (
          <div className="w-full bg-[#BDB3C2] py-2 rounded-full text-center text-[10px] text-white font-bold">
            Task Awaiting
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[9px] bg-gray-200 px-2 py-0.5 rounded-md">{days}</span>
            <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-[#948496]"
              />
            </div>
            <span className="text-[10px]">{progress}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- NavIcon ---
function NavIcon({ icon, label, active = false, onClick, showDot = false }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#7C71F5] -translate-y-1' : 'text-gray-400'}`}
    >
      <div className={`${active ? 'bg-[#7C71F5]/10 p-2.5 rounded-2xl' : 'p-1'} relative`}>
        {icon}
        {showDot && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-white/40" />
        )}
      </div>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}
