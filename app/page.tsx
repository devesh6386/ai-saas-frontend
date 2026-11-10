"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, CircleDollarSign, Crown, Database, LockKeyhole, Search, ShieldCheck, Sparkles, Star, Terminal, Zap } from "lucide-react"

const vendors = [
  { name: "Dell Premier", initials: "D", color: "bg-sky-400/15 text-sky-300", item: "UltraSharp 4K Monitor", price: 749.97, delivery: 2, rating: 4.9, confidence: 98, compliant: true, note: "Within approved category", featured: true },
  { name: "Lenovo Business", initials: "L", color: "bg-rose-400/15 text-rose-300", item: "ThinkVision P27u-20", price: 829.5, delivery: 4, rating: 4.7, confidence: 91, compliant: false, note: "Exceeds request limit", featured: false },
  { name: "HP Enterprise", initials: "H", color: "bg-emerald-400/15 text-emerald-300", item: "Z27k G3 4K Display", price: 699.0, delivery: 3, rating: 4.6, confidence: 87, compliant: true, note: "Within approved category", featured: false },
]

const auditLines = [
  ["12:04:31", "researcher", "Web context retrieved · 12 sources"],
  ["12:04:32", "inventory", "Internal MCP inventory queried"],
  ["12:04:33", "policy_engine", "Running compliance checks..."],
  ["12:04:34", "router", "Route to vendor comparison"],
  ["12:04:35", "router", "Route to END · 3 options found"],
]

function Toggle({ checked, onChange, label, icon: Icon }: { checked: boolean; onChange: (value: boolean) => void; label: string; icon: typeof ShieldCheck }) {
  return <button type="button" onClick={() => onChange(!checked)} aria-pressed={checked} className="group flex items-center gap-3 text-left">
    <span className={`relative h-6 w-11 rounded-full border transition-all ${checked ? "border-amber-400/60 bg-amber-400/20" : "border-white/15 bg-white/[0.06]"}`}>
      <span className={`absolute top-1 size-4 rounded-full transition-transform ${checked ? "translate-x-5 bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,.8)]" : "translate-x-1 bg-slate-500"}`} />
    </span>
    <Icon className={`size-4 ${checked ? "text-amber-300" : "text-slate-500"}`} />
    <span className="text-xs font-medium text-slate-300">{label}</span>
  </button>
}

function BudgetRing() {
  return <div className="relative grid size-14 place-items-center">
    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" /><circle cx="28" cy="28" r="24" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeWidth="3" strokeDasharray="151" strokeDashoffset="34" /></svg>
    <CircleDollarSign className="size-4 text-amber-300" />
  </div>
}

export default function Page() {
  const [role, setRole] = useState<"employee" | "finance">("employee")
  const [request, setRequest] = useState("Need 3 Dell 4K monitors under $800")
  const [rag, setRag] = useState(true)
  const [inventory, setInventory] = useState(true)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(false)
  const [toast, setToast] = useState("")
  const [visibleLines, setVisibleLines] = useState(5)

  useEffect(() => {
    if (!running) return
    setResult(false)
    setVisibleLines(1)
    const timer = window.setInterval(() => setVisibleLines((value) => Math.min(value + 1, auditLines.length)), 500)
    const finish = window.setTimeout(() => { setRunning(false); setResult(true) }, 2800)
    return () => { window.clearInterval(timer); window.clearTimeout(finish) }
  }, [running])

  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(timer) }, [toast])

  const summary = useMemo(() => result ? "I found 3 enterprise-grade 4K displays matching your request. Dell Premier is the strongest fit: it stays within budget, is available from internal inventory, and arrives in 2 business days. All policy checks passed." : "Ready to analyze your procurement request. I’ll research approved vendors, check internal inventory, and validate against your active purchasing policy.", [result])

  return <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_80%_0%,rgba(79,70,229,.26),transparent_34%),linear-gradient(135deg,#060817_0%,#11133a_52%,#090b19_100%)] text-slate-100">
    <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-12">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl border border-amber-300/30 bg-amber-400/10 shadow-[0_0_28px_rgba(251,191,36,.18)]"><Sparkles className="size-5 text-amber-300" /></div><div><div className="font-semibold tracking-tight">Agent<span className="text-amber-300">Procure</span> <span className="text-slate-400">AI</span></div><div className="text-[9px] font-bold uppercase tracking-[.28em] text-slate-500">Executive procurement OS</div></div></div>
        <div className="flex items-center gap-4 sm:gap-7"><div className="hidden text-right sm:block"><div className="text-[9px] font-bold uppercase tracking-[.22em] text-slate-500">Live budget remaining</div><div className="mt-1 font-mono text-sm text-amber-300">$15,420.00 <span className="ml-1 text-[10px] text-emerald-300">+12.4%</span></div></div><BudgetRing /><div className="flex rounded-full border border-white/10 bg-white/[.05] p-1 text-[11px] font-semibold"><button onClick={() => setRole("employee")} className={`rounded-full px-3 py-2 transition ${role === "employee" ? "bg-white/10 text-white" : "text-slate-500"}`}>Employee</button><button onClick={() => setRole("finance")} className={`rounded-full px-3 py-2 transition ${role === "finance" ? "bg-amber-300 text-slate-950" : "text-slate-500"}`}>Finance manager</button></div></div>
      </header>

      <section className="grid gap-6 pb-8 pt-9 lg:grid-cols-[1fr_330px] lg:items-end"><div><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.25em] text-amber-300"><Zap className="size-3" /> Command center</div><h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">Turn intent into <span className="text-amber-300">action.</span></h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Your autonomous procurement agent researches, validates, and routes the best purchase decision.</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[.05] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-emerald-300"><span className="size-2 animate-pulse rounded-full bg-emerald-300" />All systems operational</div><div className="mt-2 text-[11px] text-slate-500">Policy engine · MCP inventory · LangGraph</div></div></section>

      <section className="rounded-3xl border border-white/10 bg-white/[.055] p-4 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:p-6"><label htmlFor="request" className="sr-only">Describe your procurement request</label><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 focus-within:border-amber-300/50"><Search className="size-5 shrink-0 text-amber-300" /><input id="request" value={request} onChange={(event) => setRequest(event.target.value)} className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-600" placeholder="Describe what you need to procure..." /></div><button disabled={running || !request.trim()} onClick={() => setRunning(true)} className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-amber-300 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(251,191,36,.25)] transition hover:bg-amber-200 disabled:cursor-wait disabled:opacity-60">{running ? <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" /> : <Sparkles className="size-4" />} {running ? "Agent running" : "Initialize AI agent"}</button></div><div className="mt-5 flex flex-wrap gap-5 border-t border-white/10 pt-4"><Toggle checked={rag} onChange={setRag} label="Enable RAG policy engine" icon={ShieldCheck} /><Toggle checked={inventory} onChange={setInventory} label="Check internal MCP inventory" icon={Database} /></div></section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]"><div><div className="mb-4 flex items-end justify-between"><div><div className="text-[10px] font-bold uppercase tracking-[.23em] text-slate-500">Agent output</div><h2 className="mt-1 text-xl font-semibold">Vendor recommendations <span className="ml-2 rounded-full border border-white/10 px-2 py-1 text-[10px] font-medium text-slate-500">{result ? "3 matched" : "Awaiting request"}</span></h2></div><button className="hidden items-center gap-1 text-xs text-slate-400 hover:text-white sm:flex">View sourcing policy <ArrowUpRight className="size-3" /></button></div><div className="mb-5 rounded-2xl border border-indigo-300/15 bg-indigo-400/[.06] p-5"><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-indigo-300"><Sparkles className="size-3" /> Executive summary</div><p className="max-w-3xl text-sm leading-6 text-slate-300">{summary}</p></div><div className="grid gap-4 xl:grid-cols-3">{vendors.map((vendor) => <motion.article key={vendor.name} whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.015 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} style={{ transformPerspective: 900 }} className={`group relative flex flex-col rounded-2xl border bg-white/[.045] p-5 backdrop-blur-xl ${vendor.featured ? "border-amber-300/60 shadow-[0_0_32px_rgba(251,191,36,.11)]" : "border-white/10"}`}><div className="absolute -top-3 right-4">{vendor.featured && <span className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-[#171630] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300"><Crown className="size-3" /> Top recommendation</span>}</div><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`grid size-10 place-items-center rounded-xl text-sm font-bold ${vendor.color}`}>{vendor.initials}</div><div><h3 className="text-sm font-semibold">{vendor.name}</h3><p className="mt-0.5 text-[11px] text-slate-500">{vendor.item}</p></div></div><div className="flex items-center gap-1 text-xs text-amber-300"><Star className="size-3 fill-current" />{vendor.rating}</div></div><div className="mt-7 flex items-end justify-between"><div><div className="text-[10px] uppercase tracking-widest text-slate-500">Unit price</div><div className="mt-1 text-3xl font-semibold tracking-tight">${vendor.price.toFixed(2)}</div></div><div className="text-right"><div className="text-[10px] uppercase tracking-widest text-slate-500">Delivery</div><div className="mt-1 text-sm font-semibold text-slate-200">{vendor.delivery} days</div></div></div><div className="mt-5 flex items-center justify-between border-y border-white/10 py-3"><div className="text-[10px] uppercase tracking-widest text-slate-500">AI confidence</div><div className="font-mono text-sm text-emerald-300">{vendor.confidence}%</div></div><div className={`mt-4 flex items-center gap-2 text-[11px] ${vendor.compliant ? "text-emerald-300" : "text-rose-300"}`}><span className={`size-1.5 rounded-full ${vendor.compliant ? "bg-emerald-300" : "bg-rose-300"}`} />{vendor.compliant ? "Compliant" : `Violates policy · ${vendor.note}`}</div><button onClick={() => role === "finance" && setToast("PayPal order captured")} disabled={role !== "finance" || !vendor.compliant} title={role !== "finance" ? "Finance Manager Required" : !vendor.compliant ? "This vendor violates policy" : "Approve with PayPal"} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.06] py-3 text-xs font-bold text-slate-300 transition hover:border-amber-300/50 hover:bg-amber-300/10 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-45">{role !== "finance" ? <LockKeyhole className="size-3" /> : <CircleDollarSign className="size-3 text-sky-300" />}{role !== "finance" ? "Finance approval required" : "Approve & checkout"}</button></motion.article>)}</div></div>

        <aside className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Terminal className="size-4 text-amber-300" /><h2 className="text-sm font-semibold">Live audit log</h2></div><span className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-emerald-300"><span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />Live</span></div><div className="mt-5 rounded-xl border border-white/10 bg-[#05060d] p-4 font-mono text-[10px] leading-6"><div className="mb-3 text-slate-600">// langgraph execution trace</div>{auditLines.slice(0, visibleLines).map(([time, node, text]) => <div key={time} className="flex gap-2"><span className="text-slate-600">{time}</span><span className={node === "policy_engine" ? "text-amber-300" : "text-indigo-300"}>[{node}]</span><span className="text-slate-400">{text}</span></div>)}{running && <div className="mt-1 animate-pulse text-amber-300">_</div>}</div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-white/[.03] p-3"><div className="text-[9px] uppercase tracking-wider text-slate-500">Latency</div><div className="mt-1 font-mono text-sm text-slate-200">1.42s</div></div><div className="rounded-xl border border-white/10 bg-white/[.03] p-3"><div className="text-[9px] uppercase tracking-wider text-slate-500">Nodes</div><div className="mt-1 font-mono text-sm text-emerald-300">5 / 5</div></div></div><div className="mt-5 flex items-center gap-2 text-[10px] text-slate-500"><Check className="size-3 text-emerald-300" />Audit trail secured by LangSmith</div></aside></div>
    </div>{toast && <div role="status" className="fixed bottom-6 right-6 flex items-center gap-3 rounded-xl border border-emerald-300/30 bg-[#101f27] px-4 py-3 text-sm text-emerald-200 shadow-2xl"><Check className="size-4" />{toast}</div>}
  </main>
}
