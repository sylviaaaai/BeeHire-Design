"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Send, CheckCircle2 } from "lucide-react";

type Task = {
  id: string;
  company: string;
  title: string;
  hourly: number;
};

const TASK_INDEX: Task[] = [
  { id: "dove-01", company: "Dove", title: "Assembly-line screen clicking", hourly: 15 },
  { id: "fedex-01", company: "FedEx", title: "Loading parcels onto a conveyor belt", hourly: 36 },
  { id: "nutella-01", company: "Nutella", title: "Feeding materials into chocolate machines", hourly: 20 },
  { id: "sanitation-01", company: "SanitationCo.", title: "Collecting trash bins along assigned streets", hourly: 36 },
  { id: "pictake-01", company: "PicTake.AI", title: "Street photo capture every 10 seconds", hourly: 50 },
];

const LS = {
  cart: "workCart",
  applying: "workApplying",
  approved: "workApproved",
};

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

function findTask(id: string) {
  return TASK_INDEX.find((t) => t.id === id) || { id, company: "Unknown", title: "Unknown task", hourly: 0 };
}

export default function WorkListPage() {
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);
  const [applying, setApplying] = useState<string[]>([]);
  const [approved, setApproved] = useState<string[]>([]);

  useEffect(() => {
    setCart(readList(LS.cart));
    setApplying(readList(LS.applying));
    setApproved(readList(LS.approved));
  }, []);

  const cartTasks = useMemo(() => cart.map(findTask), [cart]);
  const applyingTasks = useMemo(() => applying.map(findTask), [applying]);
  const approvedTasks = useMemo(() => approved.map(findTask), [approved]);

  // （可选）快速操作：从购物车移动到申请中
  const moveCartToApplying = (id: string) => {
    const nextCart = cart.filter((x) => x !== id);
    const nextApplying = Array.from(new Set([...applying, id]));
    setCart(nextCart);
    setApplying(nextApplying);
    writeList(LS.cart, nextCart);
    writeList(LS.applying, nextApplying);
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
          <p className="text-white/60 text-sm mt-1">
            1) Cart · 2) Applying · 3) Approved
          </p>
        </div>

        <div className="flex-1 bg-white rounded-t-[2.5rem] px-6 pt-6 pb-10 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <Section title="Cart" icon={<ShoppingCart size={16} />} count={cartTasks.length}>
            {cartTasks.length === 0 ? (
              <EmptyHint text="No items in your cart yet." />
            ) : (
              <div className="space-y-3">
                {cartTasks.map((t) => (
                  <Card key={t.id} title={`${t.company}`} subtitle={t.title} meta={`$${t.hourly.toFixed(2)}/hr`}>
                    <button
                      onClick={() => moveCartToApplying(t.id)}
                      className="w-full mt-3 py-3 rounded-xl bg-[#070F2B] text-white font-bold active:scale-95 transition"
                    >
                      Apply from Cart
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
        <div>
          <div className="text-sm font-bold text-[#1B2140]">{title}</div>
          <div className="text-[13px] text-slate-600 mt-1">{subtitle}</div>
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
