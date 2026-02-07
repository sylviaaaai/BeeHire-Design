"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Play, 
  Home, 
  LayoutGrid, 
  User, 
  ArrowUpRight, 
  Wallet,
  Clock
} from "lucide-react";

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

// --- 2. 主页面 ---
export default function DashboardPage() {
  const [username, setUsername] = useState("Bee");
  const [today, setToday] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);

    const now = new Date();
    const formatted = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
    setToday(formatted);
  }, []);

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased overflow-hidden">
      <div className="w-full max-w-md bg-[#070F2B] relative flex flex-col h-screen">

        {/* === 顶部星空区域 === */}
        <div className="px-6 pt-10 pb-12 text-white relative overflow-hidden shrink-0">

          <StarField />

          {/* 欢迎语 */}
          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <img src="/Bee.svg" className="w-7 h-7" alt="logo" />
            </div>
            <div>
              <p className="text-white/90 text-xs font-medium tracking-wide">
                Hi, {username}
              </p>
              <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
            </div>
          </div>

          {/* 工作时间卡片 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 mb-8 border border-white/10 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2 opacity-50">
                <Clock size={14} />
                <p className="text-[10px] uppercase tracking-widest">
                  {today}
                </p>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">
              Total Work Hours
            </p>
            <h2 className="text-5xl font-bold tracking-tighter drop-shadow-lg">
              05<span className="text-2xl opacity-60 ml-1">h</span>{" "}
              23<span className="text-2xl opacity-60 ml-1">m</span>{" "}
              56<span className="text-sm opacity-60 ml-1">s</span>
            </h2>
          </motion.div>

          {/* 收入 */}
          <div className="relative z-10 flex justify-between px-2 mb-2">
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
        <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-32 overflow-y-auto relative z-20">

          <h3 className="text-center text-[#2D161C] text-lg font-bold mb-6">
            Your Current Contract
          </h3>

          <div className="space-y-4">
            <TaskCard 
              brand="Nike"
              title="Workshop process sampling & material handling"
              stipend="$11.70"
              requirement="High"
              days="5 days/week"
              progress={67}
            />

            <TaskCard 
              brand="P&G"
              title="Packaging defect detection & visual checks"
              stipend="$8.20"
              requirement="Medium"
              days="3 days/week"
              progress={20}
            />

            <TaskCard 
              brand="TikTok"
              title="Sponsored post interaction alignment"
              stipend="$5.00"
              requirement="Low"
              isAwaiting
            />
          </div>

          {/* Add More */}
          <div className="mt-10 pb-4">
            <button className="w-full flex items-center justify-center gap-3 
              bg-[#070F2B] text-white py-5 rounded-2xl font-bold 
              shadow-xl shadow-blue-900/30 active:scale-95 transition hover:bg-[#0A163B]">
              <Plus size={22} />
              Add More
            </button>
          </div>

        </div>

        {/* === 底部导航栏 === */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 pb-6 rounded-t-[2rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22}/>} label="Home" active />
              <NavIcon icon={<Wallet size={22}/>} label="Earn" />
              <NavIcon icon={<LayoutGrid size={22}/>} label="Task Hub" />
              <NavIcon icon={<User size={22}/>} label="Profile" />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- TaskCard ---
function TaskCard({ brand, title, stipend, requirement, days, progress, isAwaiting }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-[#EBE5EB] rounded-[1.8rem] p-5 flex gap-4 items-start"
    >
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center">
        <span className="font-bold text-xs">{brand}</span>
      </div>

      <div className="flex-1">
        <h4 className="text-[13px] font-bold mb-2">{title}</h4>

        <div className="flex flex-wrap gap-x-3 text-[10px] mb-3">
          <p>Stipend: <b>{stipend} / hr</b></p>
          <p>Req: <b>{requirement}</b></p>
        </div>

        {isAwaiting ? (
          <div className="w-full bg-[#BDB3C2] py-2 rounded-full text-center text-[10px] text-white font-bold">
            Task Awaiting
          </div>
        ) : (
          <div className="flex items-center gap-3">
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
function NavIcon({ icon, label, active = false }: any) {
  return (
    <button className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#7C71F5] -translate-y-1' : 'text-gray-400'}`}>
      <div className={`${active ? 'bg-[#7C71F5]/10 p-2.5 rounded-2xl' : 'p-1'}`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}
