"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Play, 
  Home, 
  Moon, 
  LayoutGrid, 
  Music, 
  User, 
  ArrowUpRight, 
  Wallet,
  Clock
} from "lucide-react";

// --- 1. 星星背景组件 (StarField) ---
// 这个组件生成随机闪烁的星星，不需要下载任何图片
function StarField() {
  // 生成 35 颗随机星星
  const stars = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,      // 大小 1px - 3px
    top: `${Math.random() * 100}%`,   // 随机位置
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 2,  // 闪烁速度
    delay: Math.random() * 5,         // 随机延迟
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
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)", // 发光效果
          }}
          animate={{ 
            opacity: [0.1, 1, 0.1], // 呼吸闪烁
            scale: [1, 1.2, 1] 
          }} 
          transition={{ 
            duration: star.duration, 
            repeat: Infinity, 
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// --- 2. 主页面组件 ---
export default function DashboardPage() {
  const [username, setUsername] = useState("Bee");

  // 模拟读取用户名
  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased overflow-hidden">
      <div className="w-full max-w-md bg-[#070F2B] relative flex flex-col h-screen">
        
        {/* === 顶部深色区域 (带星空) === */}
        <div className="px-6 pt-10 pb-12 text-white relative overflow-hidden shrink-0">
          
          {/* 插入星星背景 */}
          <StarField />

          {/* 欢迎语 (z-10 确保在星星上面) */}
          <div className="relative z-10 flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm">
              {/* 如果没有图片，会显示默认图标 */}
              <img src="/Bee.svg" className="w-7 h-7" alt="logo" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div>
              <p className="text-white/90 text-xs font-medium tracking-wide">Hi, {username} <span className="opacity-55"></span></p>
              <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
            </div>
          </div>

          {/* 工作时间大卡片 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 mb-8 border border-white/10 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2 opacity-50">
                <Clock size={14} />
                <p className="text-[10px] uppercase tracking-widest">2026/2/10</p>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">Total Work Hours</p>
            <h2 className="text-5xl font-bold tracking-tighter drop-shadow-lg">
              05<span className="text-2xl font-normal opacity-60 ml-1">h</span> 23<span className="text-2xl font-normal opacity-60 ml-1">m</span> 56<span className="text-sm font-normal opacity-60 ml-1">s</span>
            </h2>
          </motion.div>

          {/* 收入统计 */}
          <div className="relative z-10 flex justify-between px-2 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
                 <Wallet size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Overnight</p>
                <p className="text-xl font-bold flex items-center gap-1">
                  $43.29<ArrowUpRight size={14} className="text-emerald-400" />
                </p>
              </div>
            </div>
            <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
                 <Wallet size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Weekly</p>
                <p className="text-xl font-bold">$203.12</p>
              </div>
            </div>
          </div>
        </div>

        {/* === 白色内容区域 === */}
        <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-8 pb-32 overflow-y-auto relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <h3 className="text-center text-[#2D161C] text-lg font-bold mb-6 tracking-wide">
            Your Current Contract
          </h3>

          <div className="space-y-4">
            {/* 任务卡片列表 */}
            <TaskCard 
              brand="Nike"
              title="Workshop process sampling & material handling"
              stipend="$11.70"
              requirement="High"
              days="5 days/week"
              progress={67}
              color="bg-white" // 这里可以换 logo 图片路径
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

          {/* 底部按钮组 */}
          <div className="flex gap-4 mt-8 pb-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#8E97B6] text-white py-4 rounded-2xl font-bold shadow-lg shadow-gray-300/50 active:scale-95 transition hover:bg-[#7A83A0]">
              <Plus size={20} /> Add More
            </button>
            <button className="flex-[1.5] flex items-center justify-center gap-2 bg-[#070F2B] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 active:scale-95 transition hover:bg-[#0A163B]">
              <Play size={20} fill="currentColor" /> Start Working!
            </button>
          </div>
        </div>

        {/* === 底部导航栏 === */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* 渐变遮罩，让底部看起来更柔和 */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
            
            <div className="max-w-md mx-auto relative bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 pb-6 rounded-t-[2rem] shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-end text-gray-400">
                <NavIcon icon={<Home size={22}/>} label="Home" active />
                <NavIcon icon={<Moon size={22}/>} label="Sleep" />
                <NavIcon icon={<LayoutGrid size={22}/>} label="Task Hub" />
                <NavIcon icon={<Music size={22}/>} label="Music" />
                <NavIcon icon={<User size={22}/>} label="Profile" />
              </div>
            </div>
        </div>

      </div>
    </main>
  );
}

// --- 3. 子组件：任务卡片 ---
function TaskCard({ brand, title, stipend, requirement, days, progress, isAwaiting }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      // 这里使用了淡紫灰色背景 bg-[#EBE5EB] 模仿图片中的高级质感
      className="bg-[#EBE5EB] rounded-[1.8rem] p-5 flex gap-4 items-start shadow-sm border border-white/50"
    >
      {/* 品牌 Logo 区域 */}
      <div className="flex flex-col items-center gap-2 min-w-[60px]">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
          {/* 这里只是占位符，你可以换成 <img src="..." /> */}
          <span className="font-bold text-xs text-gray-800">{brand}</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="text-[13px] font-bold text-[#2D161C] leading-snug mb-2">{title}</h4>
        
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[10px] mb-3">
          <p className="text-gray-500">Stipend: <span className="text-[#059669] font-bold">{stipend} / hr</span></p>
          <p className="text-gray-500">Req: <span className={`${requirement === 'High' ? 'text-blue-500' : requirement === 'Medium' ? 'text-emerald-600' : 'text-gray-500'} font-bold`}>{requirement}</span></p>
        </div>

        {isAwaiting ? (
          <div className="w-full bg-[#BDB3C2] py-2 rounded-full text-center text-[10px] text-white font-bold tracking-wide shadow-inner">
            Task Awaiting
          </div>
        ) : (
          <div className="flex items-center gap-3">
             <span className="text-[9px] bg-gray-500/10 text-gray-600 px-2 py-0.5 rounded-md font-bold whitespace-nowrap">{days}</span>
             <div className="flex-1 h-3 bg-white/60 rounded-full overflow-hidden flex items-center px-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  // 进度条使用了稍微暗一点的紫色
                  className="h-2 bg-[#948496] rounded-full shadow-sm" 
                />
             </div>
             <span className="text-[10px] text-gray-500 font-bold">{progress}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- 4. 子组件：底部导航图标 ---
function NavIcon({ icon, label, active = false }: any) {
  return (
    <button className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-[#7C71F5] -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`${active ? 'bg-[#7C71F5]/10 p-2.5 rounded-2xl shadow-sm' : 'p-1'}`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold tracking-tight">{label}</span>
    </button>
  );
}

