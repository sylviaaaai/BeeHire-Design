"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Send, CheckCircle2 } from "lucide-react";

type Task = {
  id: string;
  company: string;
  title: string;
  hourly: number;
  tierRequired: "New" | "Advanced" | "Golden";
  premiumOnly?: boolean;
};

const TASK_INDEX: Task[] = [
  { id: "nike-01", company: "Nike", title: "Workshop process sampling & material handling", hourly: 11.7, tierRequired: "New" },
  { id: "pg-01", company: "P&G", title: "Packaging defect detection & visual checks", hourly: 8.2, tierRequired: "New" },
  { id: "tiktok-01", company: "TikTok", title: "Sponsored post interaction alignment", hourly: 5, tierRequired: "New" },

  { id: "stride-01", company: "Stride", title: "Leave 5-star reviews on Amazon", hourly: 15, tierRequired: "New" },
  { id: "pastahut-01", company: "PastaHut", title: "Chopping vegetables (Onions, garlic, basil)", hourly: 24, tierRequired: "Advanced" },
  { id: "hm-01", company: "H&M", title: "Folding garments to preset orientation", hourly: 20, tierRequired: "New" },
  { id: "lego-01", company: "LEGO", title: "Picking a fixed number of components for each LEGO product", hourly: 48, tierRequired: "Golden", premiumOnly: true },
  { id: "walmart-01", company: "Walmart", title: "Repeated barcode scanning of warehouse inventory", hourly: 24, tierRequired: "Advanced" },

  { id: "dove-01", company: "Dove", title: "Assembly-line screen clicking", hourly: 15, tierRequired: "New" },
  { id: "fedex-01", company: "FedEx", title: "Loading parcels onto a conveyor belt", hourly: 36, tierRequired: "Advanced" },
  { id: "nutella-01", company: "Nutella", title: "Feeding materials into chocolate machines at fixed intervals", hourly: 20, tierRequired: "New" },
  { id: "sanitation-01", company: "SanitationCo.", title: "Collecting trash bins along assigned streets", hourly: 36, tierRequired: "Advanced" },
  { id: "pictake-01", company: "PicTake.AI", title: "Walk along the street and take random photos every 10 seconds", hourly: 50, tierRequired: "Golden", premiumOnly: true },
];

const LS = {
  cart: "workCart",
  applying: "workApplying",
  approved: "workApproved",
  beeTier: "beeTier",
  premium: "isPremium",
  contractAccepted: "contractAccepted",
};

const APPROVED_DEFAULT_IDS = ["nike-01", "pg-01", "tiktok-01"];

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

function tierRank(t: "New" | "Advanced" | "Golden") {
  return t === "New" ? 0 : t === "Advanced" ? 1 : 2;
}

function notifyWorkListChange() {
  window.dispatchEvent(new Event("worklist:update"));
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

function findTask(id: string) {
  return (
    TASK_INDEX.find((t) => t.id === id) || {
      id,
      company: "Unknown",
      title: "Unknown task",
      hourly: 0,
      tierRequired: "New",
    }
  );
}

export default function WorkListPage() {
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);
  const [applying, setApplying] = useState<string[]>([]);
  const [approved, setApproved] = useState<string[]>([]);
  const [beeTier, setBeeTier] = useState<"New" | "Advanced" | "Golden">("New");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setCart(readList(LS.cart));
    setApplying(readList(LS.applying));
    const approvedList = readList(LS.approved);
    if (approvedList.length === 0) {
      setApproved(APPROVED_DEFAULT_IDS);
      writeList(LS.approved, APPROVED_DEFAULT_IDS);
    } else {
      setApproved(approvedList);
    }
    const t = (localStorage.getItem(LS.beeTier) as "New" | "Advanced" | "Golden") || "New";
    if (t === "New" || t === "Advanced" || t === "Golden") setBeeTier(t);
    setIsPremium(localStorage.getItem(LS.premium) === "true");

    const ca = localStorage.getItem(LS.contractAccepted) === "true";
    if (!ca) {
      router.replace("/contract");
    }
  }, []);

  const cartTasks = useMemo(() => cart.map(findTask), [cart]);
  const applyingTasks = useMemo(() => applying.map(findTask), [applying]);
  const approvedTasks = useMemo(() => approved.map(findTask), [approved]);

  // （可选）快速操作：从购物车移动到申请中
  const moveCartToApplying = (task: Task) => {
    const lockedByPremium = !!task.premiumOnly && !isPremium;
    const lockedByTier = tierRank(beeTier) < tierRank(task.tierRequired);
    if (lockedByPremium || lockedByTier) return;
    const nextCart = cart.filter((x) => x !== task.id);
    const nextApplying = Array.from(new Set([...applying, task.id]));
    setCart(nextCart);
    setApplying(nextApplying);
    writeList(LS.cart, nextCart);
    writeList(LS.applying, nextApplying);
    notifyWorkListChange();
  };
  // 从购物车移除
const removeFromCart = (id: string) => {
  const nextCart = cart.filter((x) => x !== id);
  setCart(nextCart);
  writeList(LS.cart, nextCart);
  notifyWorkListChange();
};


  return (
    <main className="min-h-screen bg-[#070F2B] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md h-screen flex flex-col">
        <div className="px-6 pt-10 pb-5 text-white shrink-0">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="text-2xl font-bold mt-3">My work list</h1>
        </div>

        <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-6 pb-10 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <Section title="Cart" icon={<ShoppingCart size={16} />} count={cartTasks.length}>
            {cartTasks.length === 0 ? (
              <EmptyHint text="No items in your cart yet." />
            ) : (
              <div className="space-y-3">
                {cartTasks.map((t) => (
                  <Card key={t.id} title={`${t.company}`} subtitle={t.title} meta={`$${t.hourly.toFixed(2)}/hr`}>

                    {/* Apply */}
                    {(() => {
                      const lockedByPremium = !!t.premiumOnly && !isPremium;
                      const lockedByTier = tierRank(beeTier) < tierRank(t.tierRequired);
                      const disabled = lockedByTier && !lockedByPremium;
                      const label = lockedByPremium ? "Go Premium" : lockedByTier ? "Locked" : "Apply from Cart";
                      return (
                        <button
                          onClick={() => (lockedByPremium ? router.push("/premium") : moveCartToApplying(t))}
                          disabled={disabled}
                          className={`w-full mt-3 py-3 rounded-xl font-bold active:scale-95 transition ${
                            disabled
                              ? "bg-slate-200 text-slate-500"
                              : lockedByPremium
                              ? "bg-[#9B8A18] text-white hover:brightness-105"
                              : "bg-[#070F2B] text-white"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })()}

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(t.id)}
                      className="w-full mt-2 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm font-bold hover:bg-slate-50 active:scale-95 transition"
                    >
                      Remove
                    </button>

                  </Card>
                ))}

              </div>
            )}
          </Section>

          <div className="h-6" />

          <Section title="Applying" icon={<Send size={16} />} count={applyingTasks.length}>
            {applyingTasks.length === 0 ? (
              <EmptyHint text="No active applications." />
            ) : (
              <div className="space-y-3">
                {applyingTasks.map((t) => (
                  <Card key={t.id} title={`${t.company}`} subtitle={t.title} meta="In review">
                    <div className="mt-3 text-xs text-slate-500">
                      Status: Pending · ETA: 12–48 hours
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>

          <div className="h-6" />

          <Section title="Approved" icon={<CheckCircle2 size={16} />} count={approvedTasks.length}>
            {approvedTasks.length === 0 ? (
              <EmptyHint text="No approvals yet." />
            ) : (
              <div className="space-y-3">
                {approvedTasks.map((t) => (
                  <Card key={t.id} title={`${t.company}`} subtitle={t.title} meta="Approved" />
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[#1B2140] font-bold flex items-center gap-2">
          {icon} {title}
        </h2>
        <span className="text-xs text-slate-500">({count})</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  meta,
  children,
}: {
  title: string;
  subtitle: string;
  meta: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.6rem] border border-slate-200 bg-gradient-to-b from-[#F1ECFF] to-[#F7F6FF] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <div className="w-[72px] h-[72px] rounded-2xl border border-slate-200 flex items-center justify-center">
            <div className="w-[56px] h-[56px] bg-white rounded-xl flex items-center justify-center overflow-hidden">
              {logoForCompany(title) ? (
                <img
                  src={logoForCompany(title)}
                  alt={title}
                  className={`object-contain ${
                    title === "PicTake.AI" ? "w-[180px] h-[180px]" : "w-[40px] h-[40px]"
                  }`}
                />
              ) : (
                <span className="text-[10px] text-slate-400 font-bold">LOGO</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#1B2140]">{title}</div>
            <div className="text-[13px] text-slate-600 mt-1">{subtitle}</div>
          </div>
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">{meta}</div>
      </div>
      {children}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
      {text}
    </div>
  );
}
