'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import NextImage from 'next/image';
import {
useWriteContract, useAccount, useWaitForTransactionReceipt, useChainId, useSwitchChain,
} from 'wagmi';
import { sdk } from '@farcaster/miniapp-sdk';
import {
frontendAbi, CONTRACT_ADDRESS, FREE_MINT_REAL_LIMIT, FREE_MINT_DISPLAY_MULTIPLIER,
PAID_DISPLAY_TOTAL, OPENSEA_COLLECTION_URL,
} from '@/src/constants';
import {
Info, Zap, Share2, Dna, Cpu, ExternalLink, Bell, X, Gift, CheckCircle,
Flame, Star, TrendingUp, TrendingDown, ChevronRight, Activity, Fingerprint,
Globe, BarChart3, Key, Lock, Unlock, Users, Coins, Award,
AlertCircle, BarChart2, RefreshCw,
} from 'lucide-react';
import { safeStorage } from '@/src/utils/safeStorage';
import { FarcasterContext, getNotificationDetailsFromContext, registerNotificationDetails } from '@/src/utils/farcaster';
import { RISK_LEVELS, type RiskLevelKey } from '@/src/lib/roulette-config';
import type { SpinExecutionResult } from '@/src/lib/spin-engine';
import { resolveIpfsUrl } from '@/src/lib/ipfs';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Clean Futuristic (Apple AI Lab)
// ─────────────────────────────────────────────────────────────────────────────
const T = {
bg:       '#0E1117',
card:     '#1A1F2B',
cardAlt:  '#141920',
cyan:     '#3CF2FF',
indigo:   '#5E72FF',
platinum: '#C9D1FF',
text1:    '#F0F6FF',
text2:    '#9BAACF',
muted:    '#6E7C99',
success:  '#3CF2FF',
warning:  '#FFB547',
error:    '#FF5C5C',
bronze:   '#CD7F32',
silver:   '#C0C0C0',
gold:     '#FFD700',
diamond:  '#B9F2FF',
} as const;
const GLASS_PANEL_STYLE = {
backgroundColor: 'rgba(16, 24, 40, 0.46)',
borderColor: 'rgba(173, 208, 255, 0.22)',
backdropFilter: 'blur(16px)',
WebkitBackdropFilter: 'blur(16px)',
boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 14px 36px rgba(0,0,0,0.28)',
} as const;
const GLASS_INNER_STYLE = {
backgroundColor: 'rgba(10, 16, 28, 0.52)',
borderColor: 'rgba(140, 165, 204, 0.20)',
backdropFilter: 'blur(10px)',
WebkitBackdropFilter: 'blur(10px)',
} as const;
const GLASS_HIGHLIGHT_STYLE = {
...GLASS_PANEL_STYLE,
boxShadow: `inset 0 1px 0 rgba(255,255,255,0.10), 0 14px 34px rgba(0,0,0,0.30), 0 0 22px rgba(60,242,255,0.12)`,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const MINI_APP_SHARE_URL  = process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app?v=4';
const RAW_BUILDER_CODE = process.env.NEXT_PUBLIC_BUILDER_CODE?.trim() || '';
const BUILDER_CODE: `0x${string}` | undefined =
  /^0x[0-9a-fA-F]+$/.test(RAW_BUILDER_CODE) ? (RAW_BUILDER_CODE as `0x${string}`) : undefined;
const NOTIF_DISMISSED_KEY = 'xray:notif-dismissed-v1';
const WELCOME_SEEN_KEY = 'xray_welcome';
const SHARE_CARD_BASE_URL = `${(process.env.NEXT_PUBLIC_APP_URL || 'https://x-rayv2.vercel.app').replace(/\/$/, '')}/api/share-card`;
const FONT_DISPLAY = "'Barlow Condensed', 'Orbitron', 'Space Grotesk', 'Satoshi', 'Avenir Next', 'Segoe UI', sans-serif";
const FONT_UI = "'Space Grotesk', 'Satoshi', 'Avenir Next', 'Segoe UI', sans-serif";

function fidKey(fid: number | null, key: string) {
return fid ? `xray:${fid}:${key}` : `xray:0:${key}`;
}

const ALL_CHANNELS = [
'diet','itooaphoto','nature','farcaster','lifeisgood','inflynce','reguys','fc','no-channel',
'betr','sense','veg','politics','ritualfoundation','base','memes','art','degen',
'fruitling-valley','f1','food','warpcast','eggsfun','hunt','vibely','dev',
'advantage-hub','framedl','crenelxyz','japanese-pub','miniapps','frames','farcon','base-lovers',
];
const CHANNEL_KEY = 'xray:last-channels';

function getRandomChannel(): string {
try {
    const today = new Date().toISOString().slice(0, 10);
    const saved = JSON.parse(safeStorage.getItem(CHANNEL_KEY) || '{}');
    const usedToday: string[] = saved.date === today ? (saved.used || []) : [];
    const available = ALL_CHANNELS.filter(c => !usedToday.includes(c));
    const pool   = available.length > 0 ? available : ALL_CHANNELS;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    usedToday.push(picked);
    safeStorage.setItem(CHANNEL_KEY, JSON.stringify({ date: today, used: usedToday }));
    return picked;
} catch { return ALL_CHANNELS[Math.floor(Math.random() * ALL_CHANNELS.length)]; }
}

// ─────────────────────────────────────────────────────────────────────────────
// TIERS (MUDANÇA #5)
// ─────────────────────────────────────────────────────────────────────────────
const STAKE_TIERS = [
{ min: 0,    label: 'Initiate',  color: '#6E7C99' },
{ min: 100,  label: 'Scanner',   color: '#3CF2FF' },
{ min: 500,  label: 'Analyzer',  color: '#5E72FF' },
{ min: 1000, label: 'Architect', color: '#FFD700' },
];
const STAKE_TIERS_FULL = [
{ min: 0,    label: 'Initiate',  color: '#6E7C99', perks: ['1 Spin/day', 'Basic rewards'],                                   spinBoost: '1×', tokenBoost: '—'    },
{ min: 100,  label: 'Scanner',   color: '#3CF2FF', perks: ['2 Spins/day', '+25% token boost', 'Scanner badge'],                spinBoost: '2×', tokenBoost: '+25%' },
{ min: 500,  label: 'Analyzer',  color: '#5E72FF', perks: ['3 Spins/day', '+50% token boost', 'Analyzer badge', 'Airdrop priority'], spinBoost: '3×', tokenBoost: '+50%' },
{ min: 1000, label: 'Architect', color: '#FFD700', perks: ['5 Spins/day', '+100% token boost', 'Architect badge', 'Guaranteed Airdrop'], spinBoost: '5×', tokenBoost: '+100%' },
];

function getTierFromPoints(pts: number) {
return [...STAKE_TIERS].reverse().find(t => pts >= t.min) || STAKE_TIERS[0];
}
function getTierFull(pts: number) {
return [...STAKE_TIERS_FULL].reverse().find(t => pts >= t.min) || STAKE_TIERS_FULL[0];
}

type IdentityClass = {
label: string;
accent: string;
description: string;
};

function getIdentityClass(score: number): IdentityClass {
if (score >= 500) return { label: 'X-RAY ALPHA', accent: '#FFD700', description: 'Dominant protocol specimen' };
if (score >= 250) return { label: 'RADIOLOGIST', accent: '#3CF2FF', description: 'High-value chain operator' };
if (score >= 150) return { label: 'ACTIVE SPECIMEN', accent: '#5E72FF', description: 'Consistent onchain activity' };
if (score >= 50) return { label: 'PATIENT', accent: '#9BAACF', description: 'Identity initialized' };
return { label: 'GHOST', accent: '#6E7C99', description: 'No radiographic footprint yet' };
}

function buildShareCardUrl(input: {
fid: number;
username: string;
pfpUrl: string | null;
score: number;
nftCount: number;
rank: number | null;
}) {
const identity = getIdentityClass(input.score);
const params = new URLSearchParams({
username: input.username,
score: String(input.score),
badge: identity.label,
nftCount: String(input.nftCount),
rank: input.rank ? String(input.rank) : '',
pfp: input.pfpUrl || '',
fid: String(input.fid),
});
return `${SHARE_CARD_BASE_URL}?${params.toString()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function getMintDisplayInfo(realCount: number | null) {
if (realCount === null) {
return {
isFreePhase: true, displayCount: null,
displayTotal: FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER,
progressPct: 0, badgeLabel: '🟢 FREE MINT', badgeColor: T.cyan, priceLabel: 'FREE',
};
}
const isFreePhase = realCount < FREE_MINT_REAL_LIMIT;
if (isFreePhase) {
const displayCount = realCount * FREE_MINT_DISPLAY_MULTIPLIER;
const displayTotal = FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER;
return {
isFreePhase: true, displayCount, displayTotal,
progressPct: (displayCount / displayTotal) * 100,
badgeLabel: '🟢 FREE MINT', badgeColor: T.cyan, priceLabel: 'FREE',
};
}
const paidCount = realCount - FREE_MINT_REAL_LIMIT;
return {
isFreePhase: false, displayCount: paidCount, displayTotal: PAID_DISPLAY_TOTAL,
progressPct: (paidCount / PAID_DISPLAY_TOTAL) * 100,
badgeLabel: '💰 0.002 ETH', badgeColor: T.warning, priceLabel: '0.002 ETH',
};
}

function getErrorMessage(error: unknown): string {
if (error instanceof Error) return error.message;
if (typeof error === 'string') return error;
return 'Unknown error occurred.';
}
function classifyMintError(error: unknown): string {
  const raw = getErrorMessage(error).toLowerCase();
  if (raw.includes('user rejected') || raw.includes('user denied') || raw.includes('4001')) {
    return 'Transaction cancelled. No funds were spent.';
  }
  if (raw.includes('insufficient funds') || raw.includes('insufficient balance')) {
    return 'Insufficient ETH balance for mint + gas on Base.';
  }
  if (raw.includes('already minted') || raw.includes('token already exists')) {
    return 'This FID already has an X-RAY on-chain.';
  }
  if (raw.includes('timeout') || raw.includes('aborted')) {
    return 'Request timed out. Check your connection and try again.';
  }
  if (raw.includes('signer') || raw.includes('signature')) {
    return 'Signature verification failed. Please try again.';
  }
  return getErrorMessage(error);
}

function withMintTimeout<T>(promise: Promise<T>, ms = 120_000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error('Mint timeout: wallet did not respond in 2 minutes.'));
    }, ms);
    promise
      .then((v) => { clearTimeout(t); resolve(v); })
      .catch((e) => { clearTimeout(t); reject(e); });
  });
}
function todayStr()    { return new Date().toISOString().slice(0, 10); }
function todayLocalStr() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}
function getPoints(fid: number | null): number {
if (typeof window === 'undefined') return 0;
return Number(safeStorage.getItem(fidKey(fid, 'points')) || '0');
}
function addPoints(fid: number | null, n: number, skipSync = false) {
  safeStorage.setItem(fidKey(fid, 'points'), String(getPoints(fid) + n), skipSync);
}
function getTasksDone(fid: number | null): Record<string, boolean> {
try { return JSON.parse(safeStorage.getItem(fidKey(fid, 'tasks')) || '{}'); } catch { return {}; }
}
function saveTasksDone(fid: number | null, tasks: Record<string, boolean>) {
safeStorage.setItem(fidKey(fid, 'tasks'), JSON.stringify(tasks));
}
function getShareData(fid: number | null) {
try { return JSON.parse(safeStorage.getItem(fidKey(fid, 'share')) || '{}'); } catch { return {}; }
}
function getFollowXData(fid: number | null) {
try { return JSON.parse(safeStorage.getItem(fidKey(fid, 'follow-x')) || '{}'); } catch { return {}; }
}
type CheckinCache = {
  streak: number;
  bestStreak: number;
  lastDate: string;
  history: string[];
};

function mergeCheckinHistory(history: string[], date: string): string[] {
  return Array.from(new Set([date, ...history].filter(Boolean))).sort((a, b) => b.localeCompare(a));
}

function getCheckinCache(fid: number | null): CheckinCache | null {
  try {
    const parsed = JSON.parse(safeStorage.getItem(fidKey(fid, 'checkin-cache')) || '{}');
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      streak: Number(parsed.streak || 0),
      bestStreak: Number(parsed.bestStreak || 0),
      lastDate: typeof parsed.lastDate === 'string' ? parsed.lastDate : '',
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return null;
  }
}
function saveCheckinCache(fid: number | null, payload: CheckinCache) {
  safeStorage.setItem(fidKey(fid, 'checkin-cache'), JSON.stringify(payload));
}
async function compressImage(base64Str: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => resolve(base64Str), 8000); // fallback

    img.onload = () => {
      clearTimeout(timeout);
      const canvas = document.createElement('canvas');
      const MAX = 1024;
      let w = img.width, h = img.height;
      if (w <= MAX && h <= MAX) {
        resolve(base64Str);
        return;
      }
      if (w > h) { h = Math.round((h * MAX) / w); w = MAX; }
      else { w = Math.round((w * MAX) / h); h = MAX; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(base64Str); return; }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => { clearTimeout(timeout); resolve(base64Str); };
    img.src = base64Str; // src por último — evita race em Safari
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// BONUS TASKS
// ─────────────────────────────────────────────────────────────────────────────
const BONUS_TASKS = [
{ id: 'follow_fc',  label: 'Follow on Farcaster',      reward: '+10 pts', done: false },
{ id: 'follow_x',   label: 'Follow on X',              reward: '+10 pts', done: false },
{ id: 'mint_nft',   label: 'Mint your X-RAY NFT',      reward: '+50 pts', done: false },
{ id: 'share_xray', label: 'Share your X-RAY (daily)', reward: '+20 pts', done: false },
{ id: 'notif',      label: 'Enable Notifications',     reward: '+15 pts', done: false },
];

const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function normalizeAddress(value?: string | null): string | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  return ETH_ADDRESS_REGEX.test(v) ? v : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING — BG / SCAN
// ─────────────────────────────────────────────────────────────────────────────
const GridBg = () => (
  <div className="absolute inset-0 z-0 pointer-events-none"
    style={{ opacity: 0.03, backgroundImage: `linear-gradient(${T.cyan} 1px,transparent 1px),linear-gradient(90deg,${T.cyan} 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />
);
const ScanLineAnim = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    <div className="w-full h-px absolute animate-landing-scan" style={{ backgroundColor: T.cyan, opacity: 0.18, boxShadow: `0 0 14px ${T.cyan}` }} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface LandingPageProps { mintCount: number | null; onEnterApp: () => void; }

function LandingPage({ mintCount, onEnterApp }: LandingPageProps) {
const [activities, setActivities] = useState<{address:string;tokenId:number;action:string;time:string}[]>([]);
const [loadingFeed, setLoadingFeed] = useState(true);
const keysLeft = FREE_MINT_REAL_LIMIT - (mintCount ?? 0);

useEffect(() => {
fetch('/api/activity/recent')
.then(r => r.json())
.then(d => { if (d.activities?.length) setActivities(d.activities); })
.catch(() => {})
.finally(() => setLoadingFeed(false));
}, []);

return (
<div className="min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/20 font-sans"
style={{ backgroundColor: '#0A0A0F' }}>

  {/* HERO */}
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
    <GridBg />
    <ScanLineAnim />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 35%, rgba(60,242,255,0.16), transparent 64%)' }} />
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[540px] h-[540px] rounded-full pointer-events-none animate-pulse"
      style={{ background: 'radial-gradient(circle, rgba(76,214,255,0.14), transparent 68%)', filter: 'blur(8px)' }} />
    <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 backdrop-blur-md"
        style={{ backgroundColor: `${T.cyan}0a`, border: `1px solid ${T.cyan}22` }}>
        <Globe size={10} style={{ color: T.cyan }} />
        <span className="font-extrabold tracking-tight uppercase" style={{ color: T.text2, fontSize: 8, letterSpacing: '0.32em' }}>
          Protocol Identity Economy • Base Network
        </span>
      </div>

      <div className="mb-8 space-y-1">
        <h1 className="font-extrabold tracking-tight uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(38px,9vw,74px)', color: T.text1, fontFamily: FONT_DISPLAY }}>
          Reveal Your
        </h1>
        <h1 className="font-extrabold tracking-tight uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(38px,9vw,74px)', color: T.cyan, textShadow: `0 0 50px ${T.cyan}44`, fontFamily: FONT_DISPLAY }}>
          Farcaster Skeleton.
        </h1>
      </div>

      <p className="italic mb-12 max-w-sm font-medium leading-relaxed"
        style={{ color: '#96A6C6', fontSize: 12, fontFamily: FONT_UI }}>
        Onchain radiographic identity analysis.
      </p>

      <button onClick={onEnterApp}
        className="group relative px-12 py-5 text-lg font-black uppercase italic rounded-2xl transition-all active:scale-95 hover:scale-105 flex items-center gap-3"
        style={{ backgroundColor: T.cyan, color: T.bg, boxShadow: `0 0 60px ${T.cyan}33`, fontFamily: FONT_DISPLAY }}>
        <Fingerprint size={22} />
        <span>Run X-Ray</span>
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center gap-6 mt-8 font-mono uppercase font-black"
        style={{ fontSize: 9, letterSpacing: '0.3em' }}>
        <span style={{ color: T.muted }}>
          {mintCount === null ? '···' : mintCount * FREE_MINT_DISPLAY_MULTIPLIER} / {FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER} Genesis Keys
        </span>
        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: T.muted }} />
        <span className="animate-pulse" style={{ color: T.cyan }}>● Live Transmission</span>
      </div>
    </div>

    {/* Stats row */}
    <div className="relative z-10 mt-20 grid grid-cols-3 gap-6 w-full max-w-lg pt-10"
      style={{ borderTop: `1px solid ${T.cyan}12` }}>
      {[
        { value: mintCount === null ? '···' : String(mintCount * FREE_MINT_DISPLAY_MULTIPLIER), label: 'Genesis Keys' },
        { value: String(FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER), label: 'DNA Limit', accent: true },
        { value: mintCount === null ? '···' : String(Math.max(0, FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER - mintCount * FREE_MINT_DISPLAY_MULTIPLIER)), label: 'Free Keys Left' },
      ].map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className="text-xl font-extrabold tracking-tight tabular-nums" style={{ color: s.accent ? T.cyan : T.text1 }}>{s.value}</span>
          <span className="font-mono uppercase font-bold" style={{ color: T.muted, fontSize: 7, letterSpacing: '0.3em' }}>{s.label}</span>
        </div>
      ))}
    </div>
  </section>

  {/* LIVE FEED */}
  <section className="py-14 px-6" style={{ borderTop: `1px solid ${T.cyan}0f`, borderBottom: `1px solid ${T.cyan}0f`, backgroundColor: T.cardAlt }}>
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Activity size={12} style={{ color: T.cyan }} />
        <h3 className="font-black uppercase italic font-mono" style={{ color: T.muted, fontSize: 9, letterSpacing: '0.35em' }}>Protocol Sequence Feed</h3>
      </div>
      {loadingFeed ? (
        <div className="space-y-3">
          {[...Array(4)].map((_,i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.card }} />
                <div className="h-2 w-28 rounded" style={{ backgroundColor: T.card }} />
              </div>
              <div className="h-2 w-20 rounded" style={{ backgroundColor: T.card }} />
              <div className="h-2 w-10 rounded" style={{ backgroundColor: T.card }} />
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-center font-mono uppercase italic" style={{ color: T.muted, fontSize: 9 }}>No recent activity found</p>
      ) : (
        <div className="space-y-0">
          {activities.map((log, i) => (
            <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${T.cyan}08` }}>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: T.cyan, boxShadow: `0 0 6px ${T.cyan}` }} />
                <span className="font-mono" style={{ color: T.text2, fontSize: 10 }}>{log.address}</span>
                <span className="font-mono" style={{ color: T.muted, fontSize: 8 }}>#{log.tokenId}</span>
              </div>
              <span className="font-extrabold tracking-tight uppercase" style={{ color: `${T.cyan}99`, fontSize: 8 }}>{log.action}</span>
              <span className="font-mono uppercase" style={{ color: T.muted, fontSize: 7 }}>{log.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>

  {/* UTILITY */}
  <section className="py-24 px-6" style={{ borderBottom: `1px solid ${T.cyan}0f`, backgroundColor: T.bg }}>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight uppercase tracking-tighter mb-3"
          style={{ background: `linear-gradient(180deg, ${T.text1} 30%, ${T.muted} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          One Key. Full Access.
        </h2>
        <p className="italic" style={{ color: T.muted, fontSize: 11 }}>Everything unlocks at mint.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Key size={20} />, title: 'Identity Access', desc: 'Your Genesis Key unlocks protocol features and activates daily yields on Base Network.' },
          { icon: <Zap size={20} />, title: 'Earn XRAY', desc: 'Receive token rewards daily by maintaining activity within the X-RAY Protocol.' },
          { icon: <TrendingUp size={20} />, title: 'On-Chain Evolution', desc: 'Stake tokens to evolve your structure and unlock rare mutation forms.' },
        ].map((c, i) => (
          <div key={i} className="p-8 rounded-2xl border group transition-all duration-300"
            style={{ backgroundColor: T.card, borderColor: `${T.cyan}0f` }}>
            <div className="mb-5 opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: T.cyan }}>{c.icon}</div>
            <h4 className="text-sm font-black uppercase italic mb-2 tracking-tighter" style={{ color: T.text1 }}>{c.title}</h4>
            <p className="italic leading-relaxed" style={{ color: T.muted, fontSize: 10 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA FINAL */}
  <section className="py-24 px-6 text-center" style={{ borderBottom: `1px solid ${T.cyan}0f`, backgroundColor: T.bg }}>
    <div className="max-w-sm mx-auto">
      <h2 className="text-3xl font-extrabold tracking-tight uppercase tracking-tighter mb-4"
        style={{ color: T.cyan, textShadow: `0 0 40px ${T.cyan}44` }}>
        {mintCount === null ? '···' : `${Math.max(0, FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER - mintCount * FREE_MINT_DISPLAY_MULTIPLIER)} Free Keys Left`}
      </h2>
      <p className="italic mb-10" style={{ color: T.muted, fontSize: 11 }}>
        Free phase ends when {FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER} Genesis Keys are minted.
      </p>
      <button onClick={onEnterApp}
        className="w-full py-5 rounded-2xl font-black uppercase italic text-lg transition-all active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-3"
        style={{ backgroundColor: T.cyan, color: T.bg, boxShadow: `0 0 40px ${T.cyan}28` }}>
        <Fingerprint size={20} />
        Create Your Identity — Free
      </button>
    </div>
  </section>

  <footer className="py-10 text-center font-mono uppercase italic" style={{ borderTop: `1px solid ${T.cyan}0a`, color: T.muted, fontSize: 8, letterSpacing: '0.4em' }}>
    UselessBoy • Identity Economy on Farcaster • Base Network
  </footer>
</div>

);
}

// ─────────────────────────────────────────────────────────────────────────────
// X-RAY RISK SCANNER
// ─────────────────────────────────────────────────────────────────────────────
const RISK_COLORS: Record<RiskLevelKey, string> = {
  LOW: '#7BD6FF',
  MEDIUM: '#9FB4D9',
  HIGH: '#C7D2E8',
};

type SpinScannerStatus = {
  allowed: boolean;
  spinsLeft: number;
  spinsUsed: number;
  limit: number;
  userHasNft: boolean;
  userIsStaker: boolean;
};

function XRayRiskScanner({ fid, isMiniAppRuntime }: { fid: number | null; isMiniAppRuntime: boolean }) {
  const [risk, setRisk] = useState<RiskLevelKey>('LOW');
  const [scanning, setScanning] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [scannerMessage, setScannerMessage] = useState('');
  const [result, setResult] = useState<SpinExecutionResult | null>(null);
  const [status, setStatus] = useState<SpinScannerStatus | null>(null);
  const [scanWindow, setScanWindow] = useState<string[]>(['5X', '0X', '2X', '10X', 'BURN', '1X', '3X']);
  const [scanFlash, setScanFlash] = useState(false);
  const scanTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanOffsetRef = useRef(0);

  const TRACK_POOL = useMemo(() => ['5X', '0X', '2X', '10X', 'BURN', '1X', '3X', 'VOID', '4X', 'SAFE'], []);

  const expectedReturn = useMemo(() => {
    const config = RISK_LEVELS[risk];
    const total = config.outcomes.reduce((sum, o) => sum + (((config.cost + o.reward) / config.cost) * o.probability), 0);
    return total.toFixed(2);
  }, [risk]);

  const buildWindow = useCallback((offset: number, centerLabel?: string) => {
    const size = 7;
    const labels = Array.from({ length: size }, (_, idx) => TRACK_POOL[(offset + idx) % TRACK_POOL.length]);
    if (centerLabel) labels[3] = centerLabel;
    return labels;
  }, [TRACK_POOL]);

  const getCenterLabelFromResult = useCallback((spinResult: SpinExecutionResult, riskLevel: RiskLevelKey) => {
    const cost = RISK_LEVELS[riskLevel].cost;
    if (spinResult.isLegendary) return '10X';
    if (spinResult.reward <= -cost) return 'BURN';
    if (spinResult.reward < 0) return '0X';
    if (spinResult.reward === 0) return '1X';
    const gross = (cost + spinResult.reward) / cost;
    if (gross >= 5) return '5X';
    if (gross >= 3) return '3X';
    if (gross >= 2) return '2X';
    return '1X';
  }, []);

  const playScanBeep = useCallback((frequency: number, durationMs = 80) => {
    if (typeof window === 'undefined') return;
    const AudioContextCtor: typeof AudioContext | undefined =
      (typeof AudioContext !== 'undefined' ? AudioContext : undefined)
      || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    try {
      const audioCtx = new AudioContextCtor();
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.012;
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        void audioCtx.close();
      }, durationMs);
    } catch {
      // best-effort UX sound
    }
  }, []);

  const refreshStatus = useCallback(async () => {
    if (!fid || !isMiniAppRuntime) {
      setLoadingStatus(false);
      return;
    }
    setLoadingStatus(true);
    try {
      const response = await sdk.quickAuth.fetch('/api/spin', { method: 'GET' });
      const data = await response.json();
      if (!response.ok) {
        setScannerMessage(data?.error || 'Could not load spin status.');
        return;
      }
      setStatus({
        allowed: Boolean(data.allowed),
        spinsLeft: Number(data.spinsLeft || 0),
        spinsUsed: Number(data.spinsUsed || 0),
        limit: Number(data.limit || 0),
        userHasNft: Boolean(data.userHasNft),
        userIsStaker: Boolean(data.userIsStaker),
      });
      setScannerMessage('');
    } catch {
      setScannerMessage('Could not load spin status.');
    } finally {
      setLoadingStatus(false);
    }
  }, [fid, isMiniAppRuntime]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    };
  }, []);

  const handleSpin = async () => {
    if (!fid) {
      setScannerMessage('FID not detected.');
      return;
    }
    if (!isMiniAppRuntime) {
      setScannerMessage('Spin requires Mini App runtime.');
      return;
    }
    if (scanning) return;

    setScanning(true);
    setResult(null);
    setScannerMessage('');
    setScanFlash(false);
    playScanBeep(680, 90);

    if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    scanTimerRef.current = setInterval(() => {
      scanOffsetRef.current += 1;
      setScanWindow(buildWindow(scanOffsetRef.current));
    }, 85);

    const startedAt = Date.now();
    try {
      const response = await sdk.quickAuth.fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskLevel: risk }),
      });
      const data = await response.json();

      const elapsed = Date.now() - startedAt;
      if (elapsed < 2500) await new Promise((resolve) => setTimeout(resolve, 2500 - elapsed));

      setStatus({
        allowed: Boolean(data.allowed),
        spinsLeft: Number(data.spinsLeft || 0),
        spinsUsed: Number(data.spinsUsed || 0),
        limit: Number(data.limit || 0),
        userHasNft: Boolean(data.userHasNft),
        userIsStaker: Boolean(data.userIsStaker),
      });

      if (!response.ok) {
        setScannerMessage(data?.error || 'Spin failed.');
        return;
      }

      setResult(data.result as SpinExecutionResult);
      const centerLabel = getCenterLabelFromResult(data.result as SpinExecutionResult, risk);
      setScanWindow(buildWindow(scanOffsetRef.current + 1, centerLabel));
      setScanFlash(true);
      playScanBeep((data.result as SpinExecutionResult).reward >= 0 ? 1040 : 220, 140);
      setTimeout(() => setScanFlash(false), 260);
      if (data.result?.isLegendary) {
        setScannerMessage('Legendary Radiograph unlocked!');
      }
    } catch {
      setScannerMessage('Connection error while spinning.');
    } finally {
      if (scanTimerRef.current) {
        clearInterval(scanTimerRef.current);
        scanTimerRef.current = null;
      }
      setScanning(false);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto rounded-3xl border p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{
        background: '#0E1117',
        borderColor: 'rgba(60,242,255,0.18)',
        boxShadow: '0 0 60px rgba(60,242,255,0.15), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(60,242,255,0.14), transparent 60%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 90px rgba(0,0,0,0.55)' }} />

      <div className="text-center">
        <p className="font-mono uppercase tracking-widest" style={{ color: '#7C8DB5', fontSize: 11 }}>XRAY Protocol</p>
        <h2 className="font-extrabold tracking-tight mt-1" style={{ color: '#E7ECFF', fontSize: 23, fontFamily: FONT_DISPLAY }}>Scan Engine</h2>
        <p className="font-mono mt-1" style={{ color: '#6C7A99', fontSize: 11 }}>Risk-weighted reward simulation</p>
      </div>

      <div className="rounded-2xl border p-4"
        style={{ background: 'rgba(20,25,40,0.6)', borderColor: 'rgba(60,242,255,0.12)' }}>
        <p className="font-mono mb-1" style={{ color: '#7C8DB5', fontSize: 11 }}>XRAY Balance</p>
        <p className="font-extrabold tracking-tight" style={{ color: '#FFFFFF', fontSize: 24, fontFamily: FONT_DISPLAY }}>
          {loadingStatus ? '...' : `${status?.spinsLeft ?? 0} spins left`}
        </p>
        <p className="font-mono uppercase" style={{ color: '#6C7A99', fontSize: 9 }}>
          {status ? `${status.spinsUsed}/${status.limit} used today` : 'Loading usage'}
        </p>
      </div>

      <div>
        <p className="font-mono mb-2" style={{ color: '#7C8DB5', fontSize: 11 }}>Select Risk Tier</p>
        <div className="grid grid-cols-3 gap-2">
        {(Object.keys(RISK_LEVELS) as RiskLevelKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setRisk(key)}
            className="py-2 rounded-xl transition-all active:scale-[0.98]"
            style={{
              background: risk === key ? 'rgba(60,242,255,0.14)' : 'rgba(20,26,40,0.6)',
              borderColor: 'rgba(60,242,255,0.12)',
              color: '#E7ECFF',
              boxShadow: risk === key ? '0 0 22px rgba(60,242,255,0.30)' : 'none',
            }}
          >
            <p className="font-extrabold tracking-tight leading-none" style={{ fontSize: 14, fontFamily: FONT_DISPLAY }}>{RISK_LEVELS[key].label}</p>
            <p className="font-mono uppercase" style={{ fontSize: 9, color: '#9FB0D5' }}>{RISK_LEVELS[key].cost} XRAY</p>
          </button>
        ))}
        </div>
      </div>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(60,242,255,.34), transparent)' }} />

      <div
        className="relative h-20 overflow-hidden rounded-xl border"
        style={{
          borderColor: '#3CF2FF22',
          background: 'linear-gradient(90deg, #0F1623, #121A2E)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.35)',
        }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-20" style={{ background: 'linear-gradient(90deg, rgba(11,15,23,0.95), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(11,15,23,0.95))' }} />
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 z-30"
          style={{ background: '#3CF2FF', boxShadow: '0 0 6px rgba(60,242,255,0.4)' }} />
        {scanning && (
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 z-20 animate-[xray-scan-line_1.1s_linear_infinite]"
            style={{ background: 'rgba(110,255,190,0.72)', boxShadow: '0 0 16px rgba(110,255,190,0.55)' }} />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 px-4">
          {scanWindow.map((slot, idx) => (
            <div key={idx} className="font-extrabold tracking-tight opacity-70 whitespace-nowrap"
              style={{ color: idx === 3 ? '#E7ECFF' : '#AAB9DF', fontSize: 14, fontFamily: FONT_DISPLAY }}>
              {slot}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center rounded-2xl border p-4"
        style={{
          borderColor: result ? (result.reward >= 0 ? 'rgba(52,211,153,0.48)' : 'rgba(239,68,68,0.48)') : 'rgba(60,242,255,0.12)',
          background: scanFlash
            ? (result?.reward ?? 0) >= 0 ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)'
            : 'rgba(20,25,40,0.34)',
          boxShadow: scanFlash
            ? (result?.reward ?? 0) >= 0 ? '0 0 32px rgba(52,211,153,0.32)' : '0 0 32px rgba(239,68,68,0.32)'
            : 'none',
        }}>
        {scanning ? (
          <>
            <p className="font-mono mb-1" style={{ color: '#7C8DB5', fontSize: 10 }}>Exposure Analyzer</p>
            <p className="font-extrabold tracking-tight animate-pulse" style={{ color: '#E7ECFF', fontSize: 26, fontFamily: FONT_DISPLAY }}>SCANNING...</p>
          </>
        ) : result ? (
          <>
            <p className="font-mono uppercase" style={{ color: '#7C8DB5', fontSize: 10, letterSpacing: '0.14em' }}>EXPOSURE LEVEL: {risk}</p>
            <p className="font-extrabold tracking-tight uppercase mt-1" style={{ color: result.reward >= 0 ? '#64FFBE' : '#FF7B7B', fontSize: 18, fontFamily: FONT_DISPLAY }}>
              {result.label}
            </p>
            <p className="font-extrabold tracking-tight mt-1" style={{ color: '#F3F8FF', fontSize: 30, fontFamily: FONT_DISPLAY }}>
              {result.reward > 0 ? '+' : ''}{result.reward} XRAY
            </p>
          </>
        ) : (
          <>
            <p className="font-mono mb-1" style={{ color: '#7C8DB5', fontSize: 10 }}>Last Result</p>
            <p className="font-extrabold tracking-tight" style={{ color: '#3CF2FF', fontSize: 28, fontFamily: FONT_DISPLAY }}>Awaiting Scan</p>
          </>
        )}
      </div>

      <button
        onClick={handleSpin}
        disabled={scanning || loadingStatus || !status?.allowed}
        className="w-full py-3 rounded-2xl font-extrabold tracking-tight text-lg transition-all active:scale-95"
        style={{
          background: status?.allowed ? 'linear-gradient(to right, #22d3ee, #3b82f6)' : T.cardAlt,
          color: '#FFFFFF',
          boxShadow: status?.allowed ? '0 0 25px rgba(60,242,255,0.4)' : 'none',
          animation: status?.allowed && !scanning ? 'xray-pulse 1.8s ease-in-out infinite' : 'none',
        }}>
        {scanning ? 'Scanning...' : status?.allowed ? 'Initiate Scan' : 'Daily Limit Reached'}
      </button>

      <div className="flex items-center justify-between">
        <p className="font-mono uppercase italic" style={{ color: '#7C8DB5', fontSize: 9 }}>
          {status ? `${status.spinsUsed}/${status.limit} used today` : 'Daily limit loading...'}
        </p>
        {status?.userHasNft && (
          <p className="font-mono uppercase italic" style={{ color: '#AFC9FF', fontSize: 9 }}>
            NFT boost active
          </p>
        )}
      </div>

      <div className="rounded-lg border px-3 py-2 flex items-center justify-between"
        style={{ borderColor: 'rgba(60,242,255,0.12)', backgroundColor: 'rgba(20,25,40,0.28)' }}>
        <span className="font-mono uppercase italic" style={{ color: '#7C8DB5', fontSize: 8, letterSpacing: '0.12em' }}>
          Risk Model v1.2
        </span>
        <span className="font-mono uppercase italic" style={{ color: '#AAB9DF', fontSize: 8, letterSpacing: '0.12em' }}>
          Expected Return: {expectedReturn}x
        </span>
      </div>

      {scannerMessage && (
        <div className="p-2 rounded-lg border" style={{ borderColor: `${T.warning}44`, backgroundColor: `${T.warning}12` }}>
          <p className="font-mono uppercase italic" style={{ color: T.warning, fontSize: 9 }}>{scannerMessage}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes xray-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(60,242,255,0.2); }
          50% { box-shadow: 0 0 28px rgba(60,242,255,0.55); }
        }
        @keyframes xray-scan-line {
          0% { transform: translateX(-120%); opacity: 0.28; }
          35% { opacity: 0.85; }
          100% { transform: translateX(120%); opacity: 0.12; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REWARDS TAB
// ─────────────────────────────────────────────────────────────────────────────
function RewardsTab({
fid, hasMintedNft, username, pfpUrl, isMiniAppRuntime, isMobileRuntime, contextWallets, onPointsChanged,
}: {
fid: number | null; hasMintedNft: boolean;
username: string | null; pfpUrl: string | null;
isMiniAppRuntime: boolean;
isMobileRuntime: boolean;
contextWallets?: string[];
onPointsChanged: (pts: number, hasNft: boolean) => void;
}) {
const [points, setPoints]               = useState(0);
const [streak, setStreak]               = useState(0);
const [bestStreak, setBestStreak]       = useState(0);
const [checkedToday, setCheckedToday] = useState(false);
const [history, setHistory]           = useState<string[]>([]);
const [tasks, setTasks]                = useState(BONUS_TASKS.map(t => ({ ...t })));
const [feedback, setFeedback]          = useState('');
const [verifying, setVerifying]        = useState(false);
const [checkinLoading, setCheckinLoading] = useState(false);
const [checkinLoadingStatus, setCheckinLoadingStatus] = useState(true);

const { address } = useAccount();

useEffect(() => {
const syncPointsFromServer = async (targetFid: number | null) => {
if (!targetFid) return;
try {
const res = await fetch(`/api/leaderboard/${targetFid}`, { cache: 'no-store' });
if (!res.ok) return;
const data = await res.json();
if (typeof data?.points === 'number') {
        safeStorage.setItem(fidKey(targetFid, 'points'), String(data.points));
setPoints(data.points);
}
} catch { /* silent */ }
};

if (!fid) { setCheckinLoadingStatus(false); return; }
setPoints(getPoints(fid));
syncPointsFromServer(fid);
const cachedCheckin = getCheckinCache(fid);
if (cachedCheckin) {
setStreak(cachedCheckin.streak);
setBestStreak(cachedCheckin.bestStreak);
setHistory(cachedCheckin.history || []);
setCheckedToday(cachedCheckin.lastDate === todayStr());
}
const savedTasks  = getTasksDone(fid);
const shareData   = getShareData(fid);
const followXData = getFollowXData(fid);
if (shareData.date !== todayLocalStr()) savedTasks['share_xray'] = false;
else savedTasks['share_xray'] = true;
    if (followXData.date !== todayLocalStr()) safeStorage.setItem(fidKey(fid, 'follow-x'), ''); // Cannot remove, just clear
setTasks(prev => prev.map(t => ({ ...t, done: savedTasks[t.id] === true })));
if (hasMintedNft) setTasks(prev => prev.map(t => t.id === 'mint_nft' ? { ...t, done: true } : t));
if (!isMiniAppRuntime) { setCheckinLoadingStatus(false); return; }
sdk.quickAuth.fetch('/api/checkin', { method: 'GET' })
.then(r => r.json())
.then(data => {
if (typeof data.points === 'number') {
safeStorage.setItem(fidKey(fid, 'points'), String(data.points));
setPoints(data.points);
}
if (data.streak       !== undefined) setStreak(data.streak);
if (data.bestStreak    !== undefined) setBestStreak(data.bestStreak);
if (data.history      !== undefined) setHistory(data.history);
if (data.checkedToday !== undefined) setCheckedToday(data.checkedToday);
saveCheckinCache(fid, {
streak: Number(data.streak || 0),
bestStreak: Number(data.bestStreak || 0),
lastDate: typeof data.lastDate === 'string' ? data.lastDate : '',
history: Array.isArray(data.history) ? data.history : [],
});
})
.catch(() => {})
.finally(() => setCheckinLoadingStatus(false));
}, [fid, hasMintedNft, isMiniAppRuntime]);

const showFeedback = (msg: string, ms = 4000) => { setFeedback(msg); setTimeout(() => setFeedback(''), ms); };
const earnPoints = (n: number, hasNft = hasMintedNft) => {
addPoints(fid, n);
const newPts = getPoints(fid);
setPoints(newPts);
onPointsChanged(newPts, hasNft);
};

const setMobilePrimaryButton = useCallback(async (options: { text: string; loading?: boolean; disabled?: boolean; hidden?: boolean }) => {
if (!isMiniAppRuntime || !isMobileRuntime) return;
try {
await sdk.actions.setPrimaryButton(options);
} catch {
/* best effort */
}
}, [isMiniAppRuntime, isMobileRuntime]);

useEffect(() => {
if (!isMiniAppRuntime || !isMobileRuntime) return;
void setMobilePrimaryButton({
  text: checkedToday ? 'Concluido' : 'Check in',
  loading: checkinLoading,
  disabled: checkinLoading || checkedToday || checkinLoadingStatus,
  hidden: false,
});
}, [checkedToday, checkinLoading, checkinLoadingStatus, isMiniAppRuntime, isMobileRuntime, setMobilePrimaryButton]);

const handleCheckin = async () => {
if (!fid) { showFeedback('⚠️ FID not detected.'); return; }
const cached = getCheckinCache(fid);

    if (cached?.lastDate === todayStr()) {
      setCheckedToday(true);
      showFeedback('✅ Already checked in today!');
      return;
    }
if (checkedToday || checkinLoading || !isMiniAppRuntime) return;

const optimisticToday = todayStr();
const optimisticStreak = cached?.lastDate === (() => {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return yesterday.toISOString().slice(0, 10);
})()
  ? (cached?.streak || 0) + 1
  : 1;
const optimisticBestStreak = Math.max(optimisticStreak, cached?.bestStreak || 0);
const optimisticHistory = mergeCheckinHistory(cached?.history || history, optimisticToday);
const previousState = {
streak,
bestStreak,
checkedToday,
history,
points,
cache: cached,
};

setCheckinLoading(true);
setCheckedToday(true);
setStreak(optimisticStreak);
setBestStreak(optimisticBestStreak);
setHistory(optimisticHistory);
saveCheckinCache(fid, {
streak: optimisticStreak,
bestStreak: optimisticBestStreak,
lastDate: optimisticToday,
history: optimisticHistory,
});
showFeedback('✅ Check-in concluído. Sincronizando...');
void setMobilePrimaryButton({ text: 'Concluido', loading: true, disabled: true });

try {
const res  = await sdk.quickAuth.fetch('/api/supabase', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ action: 'checkin', fid }),
});
const data = await res.json();
if (data.alreadyDone) {
setCheckedToday(true);
saveCheckinCache(fid, {
streak: Number(data.streak || 0),
bestStreak: Number(data.bestStreak || 0),
lastDate: typeof data.lastDate === 'string' ? data.lastDate : todayStr(),
history: Array.isArray(data.history) ? data.history : [],
});
showFeedback('✅ Already checked in today!');
void setMobilePrimaryButton({ text: 'Concluido', loading: false, disabled: true });
return;
}
if (data.success) {
setStreak(data.streak); setBestStreak(data.bestStreak);
setHistory(data.history || []); setCheckedToday(true);
saveCheckinCache(fid, {
streak: Number(data.streak || 0),
bestStreak: Number(data.bestStreak || 0),
lastDate: typeof data.lastDate === 'string' ? data.lastDate : todayStr(),
history: Array.isArray(data.history) ? data.history : [],
});
if (typeof data.points === 'number') {
safeStorage.setItem(fidKey(fid, 'points'), String(data.points));
setPoints(data.points);
onPointsChanged(data.points, hasMintedNft);
} else {
earnPoints(data.pointsEarned || 10);
}
showFeedback(data.weeklyBonus
? `🎉 WEEKLY BONUS! +${data.pointsEarned} pts (${data.streak}-day streak!)`
: `✅ Check-in verified! +${data.pointsEarned} pts`);
void setMobilePrimaryButton({ text: 'Concluido', loading: false, disabled: true });

} else {
setStreak(previousState.streak);
setBestStreak(previousState.bestStreak);
setCheckedToday(previousState.checkedToday);
setHistory(previousState.history);
if (previousState.cache) saveCheckinCache(fid, previousState.cache);
showFeedback(data.error || '⚠️ Check-in failed. Try again.');
void setMobilePrimaryButton({ text: 'Check in', loading: false, disabled: false });
}
} catch {
setStreak(previousState.streak);
setBestStreak(previousState.bestStreak);
setCheckedToday(previousState.checkedToday);
setHistory(previousState.history);
setPoints(previousState.points);
if (previousState.cache) saveCheckinCache(fid, previousState.cache);
showFeedback('⚠️ Connection error. Try again.');
void setMobilePrimaryButton({ text: 'Check in', loading: false, disabled: false });
}
finally { setCheckinLoading(false); }
};

const handleTask = async (task: { id: string; label: string; reward: string; done: boolean }, index: number) => {
if (task.done || verifying) return;
// Patch D: handleTask fid guard (Protege todas as tasks contra execução sem FID)
if (!fid) { showFeedback('⚠️ FID not detected.'); return; }
if (task.id === 'follow_fc') {
try { await (sdk.actions as any).openUrl({ url: 'https://warpcast.com/euvouserdoutor' }); }
catch { await sdk.actions.composeCast({ text: 'Follow @euvouserdoutor!', embeds: [] }); }
if (fid) {
setVerifying(true); showFeedback('⏳ Verifying follow on Farcaster...', 10000);
await new Promise(r => setTimeout(r, 2500));
try {
const res  = await fetch(`/api/verify?fid=${fid}&target=euvouserdoutor`);
const data = await res.json();
if (!data.following) { showFeedback('⚠️ Follow @euvouserdoutor first, then tap again!'); setVerifying(false); return; }
} catch { /* permite se falhar */ }
setVerifying(false); setFeedback('');
}
} else if (task.id === 'follow_x') {
try { await (sdk.actions as any).openUrl({ url: 'https://x.com/useleszboy' }); }
catch { window.open('https://x.com/useleszboy', '_blank'); }
const confirmData = getFollowXData(fid);
if (confirmData.date !== todayLocalStr()) {
      safeStorage.setItem(fidKey(fid, 'follow-x'), JSON.stringify({ date: todayLocalStr(), step: 'pending' }));
showFeedback('📌 Follow @useleszboy on X, then tap again to confirm!', 6000);
return;
}
    safeStorage.setItem(fidKey(fid, 'follow-x'), ''); setFeedback('');
} else if (task.id === 'mint_nft') {
setVerifying(true); showFeedback('⏳ Verifying NFT on-chain...', 10000);
try {
const walletCandidates = Array.from(
  new Set(
    [address, ...(contextWallets || [])]
      .map((wallet) => normalizeAddress(wallet ?? null))
      .filter((wallet): wallet is string => !!wallet)
  )
);
if (walletCandidates.length === 0) {
  showFeedback('⚠️ No verified Base wallet found in Farcaster context.');
  setVerifying(false);
  return;
}
const params = walletCandidates.map((wallet) => `address=${wallet}`).join('&');
const res = await fetch(`/api/nfts?skip-indexer=1&${params}`, { cache: 'no-store' });
const data = res.ok ? await res.json() : null;
if (!res.ok || Number(data?.count || 0) <= 0) {
  showFeedback('⚠️ Mint your X-RAY NFT first, then tap again!');
  setVerifying(false);
  return;
}
setFeedback('');
} catch { showFeedback('⚠️ Could not verify. Try again.'); setVerifying(false); return; }
setVerifying(false);
} else if (task.id === 'share_xray') {
const shareData = getShareData(fid);
if (shareData.date === todayLocalStr()) { showFeedback('✅ Already shared today! Come back tomorrow.'); return; }
let nftImageUrl: string | undefined;
if (fid) {
try {
const res = await fetch(`/api/mint/nft/${fid}`);
if (res.ok) { const d = await res.json(); if (d?.image) nftImageUrl = resolveIpfsUrl(d.image); }
} catch { /* silent */ }
}

const textToShare = `☠️ XRAY is live!\n\nYour participation determines your access.\n\nStay active → Earn Tokens → Secure your STAKE 🎟\n\nEvery action counts. The more NFTs linked to your wallet, the greater the profit.\n\nPlay. Participate. Claim your spot. ⚡ @euvouserdoutor`;
const embeds: [string] | [string, string] = nftImageUrl ? [MINI_APP_SHARE_URL, nftImageUrl] : [MINI_APP_SHARE_URL];

try {
await sdk.actions.composeCast({
text: textToShare,
embeds: embeds,
channelKey: getRandomChannel(),
});

setVerifying(true);
showFeedback('⏳ Verifying cast...', 10000);
await new Promise(r => setTimeout(r, 3500)); // Aguarda indexação rápida pela API do Neynar

const verifyRes = await fetch(`/api/verify/cast?fid=${fid}`);
const verifyData = await verifyRes.json();

if (!verifyData.cast_found) { showFeedback('⚠️ Cast not published. Complete the post to earn points!'); setVerifying(false); return; }

        safeStorage.setItem(fidKey(fid, 'share'), JSON.stringify({ date: todayLocalStr() }));
earnPoints(20);
const newTasks = [...tasks]; newTasks[index] = { ...task, done: true }; setTasks(newTasks);
setVerifying(false);
setFeedback('');
} catch { showFeedback('⚠️ Cast not published. Complete the post to earn points!'); setVerifying(false); }
return;
} else if (task.id === 'notif') {
try {
if (typeof (sdk.actions as any).addMiniApp === 'function') await (sdk.actions as any).addMiniApp();
else if (typeof (sdk.actions as any).addFrame === 'function') await (sdk.actions as any).addFrame();
const context = await sdk.context;
const registered = await registerNotificationDetails(context);
if (!registered) { showFeedback('⚠️ Enable notifications to complete this task.'); return; }
setFeedback('');
} catch (e: any) {
const reason = (e?.message || '').toLowerCase();
if (reason.includes('reject') || reason.includes('cancel') || reason.includes('dismiss')) {
showFeedback('⚠️ Enable notifications to complete this task.'); return;
}
}
}
const newTasks = [...tasks]; newTasks[index] = { ...task, done: true }; setTasks(newTasks);
const savedTasks = getTasksDone(fid);
savedTasks[task.id] = true;
saveTasksDone(fid, savedTasks);
earnPoints(Number(task.reward.replace(/[^0-9]/g, '')), task.id === 'mint_nft' ? true : hasMintedNft);
};

const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const todayWeekIndex = (new Date().getUTCDay() + 6) % 7;
// Evita marcar sábado como concluído no domingo quando o check-in do dia ainda não foi feito.
const filledWeekIndex = checkedToday ? todayWeekIndex : (todayWeekIndex === 6 ? -1 : todayWeekIndex - 1);
const streakInCycle = streak === 0 ? 0 : (streak % 7 || 7);
const daysToWeekly  = streak === 0 ? 7 : (7 - streakInCycle);

return (
<div className="flex flex-col gap-4 w-full pb-4">

  {/* MUDANÇA #7: Streak Hero proeminente no topo */}
  <div className="flex gap-3 mb-4">
    <div className="flex-1 p-4 rounded-2xl border text-center"
      style={{ ...GLASS_HIGHLIGHT_STYLE, borderColor: `${T.warning}44` }}>
      <Flame className="w-6 h-6 mx-auto mb-1" style={{ color: T.warning }} />
      <p className="text-3xl font-extrabold tracking-tight tabular-nums" style={{ color: T.text1 }}>{streak}</p>
      <p className="font-mono uppercase italic" style={{ color: T.warning, fontSize: 10 }}>
        🔥 Day Streak
      </p>
    </div>
    <div className="flex-1 p-4 rounded-2xl border text-center"
      style={{ ...GLASS_INNER_STYLE }}>
      <Star className="w-6 h-6 mx-auto mb-1" style={{ color: T.platinum }} />
      <p className="text-3xl font-extrabold tracking-tight tabular-nums" style={{ color: T.text1 }}>{bestStreak}</p>
      <p className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 10 }}>Best Streak</p>
    </div>
  </div>

  {/* Daily Check-in */}
  <div className="p-4 rounded-2xl border" style={{ ...GLASS_PANEL_STYLE }}>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-sm font-extrabold tracking-tight uppercase" style={{ color: T.text1 }}>Daily Check-in</p>
        <p className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 10 }}>+10 pts/day • +30 pts every 7 days</p>
      </div>
      <button 
        onClick={(e) => { e.preventDefault(); handleCheckin(); }}
        disabled={checkinLoading || checkinLoadingStatus || checkedToday || !isMiniAppRuntime}
        className="relative px-4 py-3 rounded-xl font-extrabold tracking-tight uppercase min-w-[100px] flex items-center justify-center gap-1.5 transition-all active:scale-95"
        style={{
          backgroundColor: checkedToday ? `${T.cyan}22` : T.cyan,
          color: checkedToday ? T.cyan : T.bg,
          boxShadow: checkedToday ? 'none' : `0 0 20px ${T.cyan}44`,
          fontSize: 11,
          opacity: checkinLoadingStatus ? 0.65 : 1,
        }}>
        {checkinLoading ? 'Syncing...' : checkedToday ? '✓ Concluido' : '🔔 Check in'}
      </button>
    </div>

    {/* Week calendar */}
    <div className="flex gap-1 justify-between mb-3">
      {weekLabels.map((label, index) => {
        const isToday = index === todayWeekIndex;
        const isDone  = index <= filledWeekIndex;
        return (
          <div key={`${label}-${index}`} className="flex flex-col items-center gap-1">
            <span className="font-mono" style={{ color: T.muted, fontSize: 8 }}>{label}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center border transition-all"
              style={{
                backgroundColor: isDone ? T.cyan : T.cardAlt,
                borderColor: isToday ? T.cyan : '#ffffff10',
                color: isDone ? T.bg : T.muted,
                fontSize: 10,
                boxShadow: isDone && isToday ? `0 0 10px ${T.cyan}66` : 'none',
              }}>
              {isDone ? '✓' : isToday ? '•' : ''}
            </div>
          </div>
        );
      })}
    </div>

    {/* Weekly bonus */}
    <div className="pt-3" style={{ borderTop: `1px solid #ffffff06` }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-extrabold tracking-tight uppercase" style={{ color: T.text1, fontSize: 11 }}>🎁 Weekly Bonus</p>
          <p className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 9 }}>
            {daysToWeekly === 0 ? '🎉 Bonus earned today! +30 pts' : `${daysToWeekly} more day${daysToWeekly > 1 ? 's' : ''} to unlock 3x bonus`}
          </p>
        </div>
        <span className="font-mono font-extrabold tracking-tight" style={{ color: T.cyan, fontSize: 10 }}>{streakInCycle}/7</span>
      </div>
      <div className="flex gap-1 items-center">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full transition-all duration-500"
            style={{ backgroundColor: i < streakInCycle ? T.cyan : '#ffffff0a' }} />
        ))}
        <Gift className="w-4 h-4 ml-1" style={{ color: daysToWeekly === 0 ? T.cyan : T.muted }} />
      </div>
    </div>
  </div>

  {/* Bonus Tasks */}
  <div className="p-4 rounded-2xl border" style={{ ...GLASS_PANEL_STYLE }}>
    <p className="text-sm font-extrabold tracking-tight uppercase mb-1" style={{ color: T.text1 }}>🎯 Bonus Tasks</p>
    <p className="font-mono uppercase italic mb-3" style={{ color: T.muted, fontSize: 10 }}>All tasks verified before awarding points</p>

    {feedback && (
      <div className="mb-3 p-3 rounded-xl border"
        style={{
          backgroundColor: feedback.includes('✅') || feedback.includes('🎉') ? `${T.cyan}12` : feedback.includes('⏳') ? '#1a1400' : '#1a0000',
          borderColor:     feedback.includes('✅') || feedback.includes('🎉') ? `${T.cyan}33` : feedback.includes('⏳') ? `${T.warning}33` : '#FF000033',
        }}>
        <p className="font-mono uppercase italic font-black"
          style={{
            color: feedback.includes('✅') || feedback.includes('🎉') ? T.cyan : feedback.includes('⏳') ? T.warning : T.error,
            fontSize: 11,
          }}>
          {feedback}
        </p>
      </div>
    )}

    <div className="flex flex-col gap-2">
      {tasks.map((task, i) => {
        const isPending = task.id === 'follow_x' && (() => {
          const d = getFollowXData(fid);
          return d.date === todayLocalStr() && d.step === 'pending';
        })();
        return (
          <button key={task.id} onClick={() => handleTask(task, i)}
            disabled={task.done || (verifying && task.id !== 'follow_x')}
            className="w-full flex items-center justify-between p-3 rounded-xl border transition-all active:scale-[0.98]"
            style={{
              backgroundColor: task.done ? GLASS_INNER_STYLE.backgroundColor : isPending ? '#1a1200' : GLASS_INNER_STYLE.backgroundColor,
              borderColor: task.done ? `${T.cyan}22` : isPending ? `${T.warning}33` : GLASS_INNER_STYLE.borderColor,
            }}>
            <div className="flex items-center gap-2">
              {task.done
                ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: T.cyan }} />
                : isPending ? <span style={{ fontSize: 11 }}>📌</span>
                : <div className="w-4 h-4 rounded-full border flex-shrink-0" style={{ borderColor: T.muted }} />
              }
              <div className="text-left">
                <span className="font-mono uppercase italic block"
                  style={{ color: task.done ? T.muted : isPending ? T.warning : T.text1, fontSize: 11 }}>
                  {task.label}
                </span>
                {isPending && <span className="font-mono italic" style={{ color: T.muted, fontSize: 9 }}>Tap again to confirm</span>}
                {task.id === 'share_xray' && !task.done && (
                  <span className="font-mono italic block" style={{ color: T.muted, fontSize: 8 }}>Resets daily</span>
                )}
              </div>
            </div>
            <span className="font-mono italic font-black"
              style={{ color: task.done ? T.muted : T.cyan, fontSize: 10 }}>
              {task.reward}
            </span>
          </button>
        );
      })}
    </div>
  </div>

  <XRayRiskScanner fid={fid} isMiniAppRuntime={isMiniAppRuntime} />
</div>

);
}

// ─────────────────────────────────────────────────────────────────────────────
// STAKE TAB — $RIPS-inspired with Clean Futuristic palette
// ─────────────────────────────────────────────────────────────────────────────
function Sparkline({ color }: { color: string }) {
const points = [30,45,35,60,50,70,55,80,65,90,75,95];
const max = Math.max(...points), min = Math.min(...points);
const h = 36, w = 120;
const pts = points.map((p, i) => {
const x = (i / (points.length - 1)) * w;
const y = h - ((p - min) / (max - min)) * h;
return `${x},${y}`;
}).join(' ');
const id = color.replace('#','');
return (
<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
<defs>
<linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
<stop offset="0%" stopColor={color} stopOpacity="0.3" />
<stop offset="100%" stopColor={color} stopOpacity="0" />
</linearGradient>
</defs>
<polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#sg-${id})`} />
<polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
</svg>
);
}

function TierProgressBar({ points }: { points: number }) {
const current     = getTierFull(points);
const currentIdx  = STAKE_TIERS_FULL.findIndex(t => t.label === current.label);
const next        = STAKE_TIERS_FULL[currentIdx + 1];
if (!next) return (
<p className="font-mono italic uppercase font-black" style={{ color: current.color, fontSize: 10 }}>✦ Max tier reached</p>
);
const pct = Math.min(((points - current.min) / (next.min - current.min)) * 100, 100);
return (
<div className="flex flex-col gap-1.5">
<div className="flex justify-between">
<span className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 9 }}>Progress to {next.label}</span>
<span className="font-mono italic uppercase font-black" style={{ color: next.color, fontSize: 9 }}>{points} / {next.min} pts</span>
</div>
<div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#ffffff0a' }}>
<div className="h-full rounded-full transition-all duration-1000"
style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${current.color}, ${next.color})` }} />
</div>
</div>
);
}

function StakeTab({ fid }: { fid: number | null }) {
const [usdInput, setUsdInput] = useState('');

const PRICE = 0.00042;
const usd = Number(usdInput) || 0;
const xray = usd > 0 ? usd / PRICE : 0;
const formatXray = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return Math.floor(value).toLocaleString();
};

const mock = {
  totalStaked: '12.4M',
  totalStakers: '3,241',
  apy: '18.4%',
  supplyPct: '34%',
  circulatingPct: '61%',
  availableToStake: '4,200 $XRAY',
  availableUsd: '≈ $38.22 USD',
  currentlyStaked: '0 $XRAY',
  currentPosition: '0.00% of position · $0.00',
  rewards: '0.00',
  claimable: 'Claimable: 0.00 $XRAY',
};

return (
<div className="flex flex-col gap-4 w-full pb-4">

  <div className="w-full rounded-[20px] border p-4 relative overflow-hidden"
    style={{
      borderColor: 'rgba(60,242,255,.2)',
      background: 'linear-gradient(160deg,rgba(14,18,32,.97) 0%,rgba(8,10,18,.98) 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.04),0 24px 60px rgba(0,0,0,.55)',
    }}>
    <div className="rounded-[14px] border px-4 py-5 text-center mb-3 relative overflow-hidden"
      style={{
        borderColor: 'rgba(60,242,255,.22)',
        background: 'linear-gradient(180deg,rgba(60,242,255,.13) 0%,rgba(8,10,18,.5) 100%)',
      }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(60,242,255,.55),transparent)' }} />
      <div className="flex items-center justify-center gap-2 mb-1">
        <div className="h-px w-12" style={{ backgroundColor: 'rgba(60,242,255,.22)' }} />
        <span className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(160,175,230,.45)' }}>Current APY</span>
        <div className="h-px w-12" style={{ backgroundColor: 'rgba(60,242,255,.22)' }} />
      </div>
      <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 60, color: '#3CF2FF', textShadow: '0 0 28px rgba(60,242,255,.38),0 0 56px rgba(60,242,255,.12)' }}>
        {mock.apy}
      </p>
      <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', color: 'rgba(160,175,230,.38)' }}>Annualized · Updated every epoch</p>
    </div>

    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="rounded-xl border p-3" style={{ borderColor: 'rgba(255,255,255,.05)', backgroundColor: 'rgba(255,255,255,.02)' }}>
        <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Total Staked</p>
        <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: '#F3F7FF' }}>{mock.totalStaked}</p>
        <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}>$XRAY locked</p>
      </div>
      <div className="rounded-xl border p-3" style={{ borderColor: 'rgba(255,255,255,.05)', backgroundColor: 'rgba(255,255,255,.02)' }}>
        <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Stakers</p>
        <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: '#F3F7FF' }}>{mock.totalStakers}</p>
        <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}>active positions</p>
      </div>
    </div>

    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Supply Staked</span>
        <span className="font-extrabold tracking-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: '#3CF2FF' }}>{mock.supplyPct}</span>
      </div>
      <div className="h-[5px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,.05)' }}>
        <div className="h-full rounded-full" style={{ width: mock.supplyPct, background: 'linear-gradient(90deg,#3CF2FF,#8FA0FF)' }} />
      </div>
      <div className="flex gap-3 mt-1">
        <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}><b style={{ color: 'rgba(160,175,230,.38)', fontWeight: 400 }}>{mock.supplyPct}</b> of total supply</p>
        <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}><b style={{ color: 'rgba(160,175,230,.38)', fontWeight: 400 }}>{mock.circulatingPct}</b> circulating</p>
      </div>
    </div>

    <div className="h-px my-3" style={{ background: 'linear-gradient(90deg,transparent,rgba(60,242,255,.25),transparent)' }} />

    <div className="rounded-xl border p-3 mb-3 relative overflow-hidden"
      style={{ borderColor: 'rgba(52,211,153,.2)', background: 'linear-gradient(160deg,rgba(52,211,153,.06),rgba(8,10,18,.6))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(52,211,153,.4),transparent)' }} />
      <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(52,211,153,.6)' }}>Get started</p>
      <p className="font-extrabold tracking-tight mb-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: '#F3F7FF' }}>Buy $XRAY</p>
      <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.12em', color: 'rgba(160,175,230,.35)' }}>You pay</p>
      <div className="rounded-[10px] border px-3 py-2 mb-2" style={{ borderColor: 'rgba(52,211,153,.2)', backgroundColor: 'rgba(255,255,255,.03)' }}>
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: 'rgba(52,211,153,.8)' }}>$</span>
          <input
            value={usdInput}
            onChange={(e) => setUsdInput(e.target.value)}
            type="number"
            min="0"
            placeholder="0.00"
            className="w-full bg-transparent outline-none border-none font-extrabold tracking-tight"
            style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: '#F3F7FF' }}
          />
          <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(160,175,230,.3)' }}>USD</span>
        </div>
      </div>
      <div className="text-center py-1 opacity-60">↓</div>
      <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.12em', color: 'rgba(160,175,230,.35)' }}>You receive</p>
      <div className="rounded-[10px] border px-3 py-2 mb-2" style={{ borderColor: 'rgba(60,242,255,.18)', backgroundColor: 'rgba(60,242,255,.06)' }}>
        <div className="flex items-end gap-2">
          <span className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: '#3CF2FF' }}>{usd > 0 ? formatXray(xray) : '0'}</span>
          <span className="font-mono mb-1" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(60,242,255,.55)' }}>$XRAY</span>
        </div>
        <p className="font-mono mt-1" style={{ fontSize: 8, color: 'rgba(100,115,170,.45)' }}>
          {usd > 0 ? `≈ $${usd.toFixed(2)} USD · ${Math.floor(xray).toLocaleString()} XRAY` : '≈ $0.00 USD'}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {[10, 50, 100, 500].map((value) => (
          <button key={value} onClick={() => setUsdInput(String(value))}
            className="rounded-lg border py-1.5 font-extrabold tracking-tight transition-all active:scale-[0.96]"
            style={{ borderColor: 'rgba(52,211,153,.15)', backgroundColor: 'rgba(52,211,153,.05)', color: 'rgba(52,211,153,.8)', fontFamily: FONT_DISPLAY, fontSize: 14 }}>
            ${value}
          </button>
        ))}
      </div>
      <button className="relative w-full rounded-full py-3 font-extrabold tracking-tight transition-all active:scale-[0.96]"
        style={{ backgroundColor: '#34D399', color: '#042014', fontFamily: FONT_DISPLAY, fontSize: 18 }}>
        Buy $XRAY
        <span className="absolute -top-1 -right-1 rounded-full px-2 py-0.5 font-bold"
          style={{ fontSize: 8, backgroundColor: '#000', color: '#fff', border: '1px solid rgba(255,255,255,.18)', letterSpacing: '0.05em' }}>SOON</span>
      </button>
    </div>

    <div className="h-px my-3" style={{ background: 'linear-gradient(90deg,transparent,rgba(60,242,255,.25),transparent)' }} />

    <div className="space-y-2.5">
      <div>
        <p className="font-mono uppercase mb-1.5" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Available to Stake</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl border p-3" style={{ borderColor: 'rgba(60,242,255,.2)', background: 'linear-gradient(180deg,rgba(60,242,255,.09),rgba(8,10,18,.5))', boxShadow: '0 10px 28px rgba(60,242,255,.22)' }}>
            <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: '#F3F7FF' }}>{mock.availableToStake}</p>
            <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}>{mock.availableUsd}</p>
          </div>
          <button className="relative rounded-full min-w-[90px] px-4 py-3 font-extrabold tracking-tight transition-all active:scale-[0.96]"
            style={{ backgroundColor: '#3CF2FF', color: '#fff', boxShadow: '0 4px 16px rgba(60,242,255,.32)', fontFamily: FONT_DISPLAY, fontSize: 17 }}>
            Stake
            <span className="absolute -top-2 -right-1 rounded-full px-1.5 py-0.5"
              style={{ fontSize: 7, backgroundColor: '#000', color: '#fff', border: '1px solid rgba(255,255,255,.18)' }}>SOON</span>
          </button>
        </div>
        <p className="font-mono italic mt-2"
          style={{ fontSize: 9, color: 'rgba(160,175,230,.62)', textShadow: '0 0 10px rgba(60,242,255,.28)' }}>
          Coming soon... stay active with daily tasks, airdrop is coming 👀
        </p>
      </div>

      <div>
        <p className="font-mono uppercase mb-1.5" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Currently Staked</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl border p-3" style={{ borderColor: 'rgba(255,255,255,.05)', backgroundColor: 'rgba(255,255,255,.02)' }}>
            <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: '#F3F7FF' }}>{mock.currentlyStaked}</p>
            <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}>{mock.currentPosition}</p>
          </div>
          <button disabled className="rounded-full min-w-[90px] px-4 py-3 font-extrabold tracking-tight"
            style={{ backgroundColor: '#ECEEFF', color: '#10131D', opacity: .35, fontFamily: FONT_DISPLAY, fontSize: 17 }}>
            Unstake
          </button>
        </div>
      </div>

      <div>
        <p className="font-mono uppercase mb-1.5" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(160,175,230,.38)' }}>Staking Rewards</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl border p-3" style={{ borderColor: 'rgba(255,255,255,.05)', backgroundColor: 'rgba(255,255,255,.02)' }}>
            <p className="font-extrabold tracking-tight leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: '#F3F7FF' }}>{mock.rewards}</p>
            <p style={{ fontSize: 7, color: 'rgba(100,115,170,.4)' }}>{mock.claimable}</p>
          </div>
          <button disabled className="rounded-full min-w-[90px] px-4 py-3 font-extrabold tracking-tight"
            style={{ backgroundColor: '#ECEEFF', color: '#10131D', opacity: .35, fontFamily: FONT_DISPLAY, fontSize: 17 }}>
            Claim
          </button>
        </div>
      </div>
    </div>

    <div className="rounded-[10px] border px-3 py-2 mt-2"
      style={{ borderColor: 'rgba(248,113,113,.13)', backgroundColor: 'rgba(248,113,113,.03)', fontSize: 8, color: 'rgba(248,113,113,.5)', lineHeight: 1.65 }}>
      <b style={{ color: 'rgba(248,113,113,.75)' }}>⚠ Early exit: 5% penalty</b> — 50% burn, 50% treasury, rewards locked 7 days after claim.
    </div>

    <div className="h-px my-3" style={{ background: 'linear-gradient(90deg,transparent,rgba(60,242,255,.25),transparent)' }} />

    <div className="rounded-xl border p-3 relative overflow-hidden"
      style={{ borderColor: 'rgba(0,240,255,.15)', background: 'linear-gradient(135deg,rgba(0,240,255,.05),rgba(8,10,18,.5))' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,240,255,.3),transparent)' }} />
      <p className="font-mono uppercase mb-1" style={{ fontSize: 7, letterSpacing: '0.14em', color: 'rgba(0,240,255,.55)' }}>NFT Boost</p>
      <p className="font-extrabold tracking-tight mb-2" style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: '#F3F7FF' }}>Hold XRAY NFT → Increase APY</p>
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {[
          { label: '1 NFT', value: '+10%' },
          { label: '2 NFT', value: '+20%' },
          { label: '3 NFT', value: '+30%' },
          { label: '5+ NFT', value: '+50% 🔒', hi: true },
        ].map((item) => (
          <div key={item.label} className="rounded-[9px] border px-2.5 py-2 flex items-center justify-between"
            style={{
              borderColor: item.hi ? 'rgba(0,240,255,.18)' : 'rgba(255,255,255,.05)',
              backgroundColor: item.hi ? 'rgba(0,240,255,.04)' : 'rgba(255,255,255,.02)',
            }}>
            <span style={{ fontSize: 8, color: 'rgba(160,175,230,.38)' }}>{item.label}</span>
            <span className="font-extrabold tracking-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: item.hi ? '#00F0FF' : '#3CF2FF' }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[9px] border p-2.5 mb-2"
        style={{ borderColor: 'rgba(0,240,255,.07)', backgroundColor: 'rgba(0,240,255,.03)', fontSize: 8, color: 'rgba(100,115,170,.48)', lineHeight: 1.65 }}>
        Cap combinado: <b style={{ color: 'rgba(0,240,255,.65)' }}>+50% max</b>. Boost redistribui dentro do pool — <b style={{ color: 'rgba(0,240,255,.65)' }}>zero emissão extra</b>.
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="w-full rounded-full py-2.5 font-extrabold tracking-tight border"
          style={{ borderColor: 'rgba(0,240,255,.25)', color: '#00F0FF', backgroundColor: 'rgba(255,255,255,.04)', fontFamily: FONT_DISPLAY, fontSize: 15 }}>
          View NFTs
        </button>
        <button className="w-full rounded-full py-2.5 font-extrabold tracking-tight border"
          style={{ borderColor: 'rgba(60,242,255,.25)', color: '#C8D4FF', backgroundColor: 'rgba(255,255,255,.04)', fontFamily: FONT_DISPLAY, fontSize: 15 }}>
          Get NFT
        </button>
      </div>
    </div>

    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(180deg, rgba(6,9,16,0.72) 0%, rgba(6,9,16,0.9) 100%)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        className="w-full max-w-[320px] rounded-2xl border text-center px-5 py-6"
        style={{
          borderColor: 'rgba(60,242,255,0.4)',
          background: 'rgba(10,14,24,0.8)',
          boxShadow: '0 0 28px rgba(60,242,255,0.25)',
        }}
      >
        <p
          className="font-extrabold tracking-tight uppercase tracking-wider"
          style={{ fontFamily: FONT_DISPLAY, fontSize: 28, color: '#EAF0FF' }}
        >
          Em Breve
        </p>
        <p
          className="font-mono uppercase italic mt-2"
          style={{ fontSize: 10, letterSpacing: '0.08em', color: 'rgba(160,175,230,.78)' }}
        >
          Participe das atividades diarias
        </p>
        <p
          className="font-mono uppercase italic mt-1"
          style={{ fontSize: 10, letterSpacing: '0.08em', color: '#3CF2FF' }}
        >
          Air Drop vem ai 👀
        </p>
      </div>
    </div>
  </div>
</div>
);
}

// ─────────────────────────────────────────────────────────────────────────────
// LEADERBOARD TAB
// ─────────────────────────────────────────────────────────────────────────────
type LBUser = {
rank: number;
fid: number;
username: string;
pfpUrl: string | null;
points: number;
basePoints?: number;
hasNft: boolean;
nftCount?: number;
nftScore?: number;
totalPoints?: number;
neynarScore?: number;
};
// MUDANÇA #5: Atualização de cores e icons dos Tiers no Leaderboard
const TIER_COLORS: Record<string, string> = { Architect: '#FFD700', Analyzer: '#5E72FF', Scanner: '#3CF2FF', Initiate: '#6E7C99' };
const TIER_ICONS:  Record<string, string> = { Architect: '💎', Analyzer: '🥇', Scanner: '🥈', Initiate: '🥉' };

function LeaderboardTab({ fid, username }: { fid: number | null; username: string | null }) {
const [users, setUsers]     = useState<LBUser[]>([]);
const [total, setTotal]     = useState(0);
const [loading, setLoading] = useState(true);
const [view, setView]        = useState<'points' | 'nft'>('points');

const getNftCount = useCallback((u: LBUser) => {
const count = Number(u.nftCount);
if (Number.isFinite(count) && count >= 0) return Math.floor(count);
return 0;
}, []);
const getNftScore = useCallback((u: LBUser) => {
const count = getNftCount(u);
if (count === 0) return 0;
return 50 + (count - 1) * 100;
}, [getNftCount]);
const getBasePoints = useCallback((u: LBUser) => {
const base = Number(u.basePoints);
if (Number.isFinite(base) && base >= 0) return base;
return Number(u.points) || 0;
}, []);
const getTotalScore = useCallback((u: LBUser) => {
const apiTotal = Number(u.totalPoints);
if (Number.isFinite(apiTotal) && apiTotal >= 0) return apiTotal;
return getBasePoints(u) + getNftScore(u);
}, [getBasePoints, getNftScore]);

useEffect(() => {
setLoading(true);
    fetch(`/api/leaderboard?mode=${view}&limit=100&withNfts=true&includeBasePoints=true`, { cache: 'no-store' })
.then(r => r.json())
.then(data => { 
  const usersList = Array.isArray(data.users) ? data.users : [];
  setUsers(usersList); 
  setTotal(data.total || usersList.length); 
})
.catch(() => {})
.finally(() => setLoading(false));
}, [view]);

const pointsUsers = useMemo(
() => users,
[users],
);
const nftUsers = useMemo(
() => users,
[users],
);
const activeUsers = view === 'points' ? pointsUsers : nftUsers;
const activeTotal = view === 'points' ? total : users.length;
const podium = activeUsers.slice(0, 3);
const listUsers = activeUsers.slice(3);
return (
<div className="flex flex-col gap-4 w-full pb-4">
  {/* Sub tabs */}
  <div className="w-full p-1 rounded-2xl border grid grid-cols-2 gap-1"
    style={{ ...GLASS_PANEL_STYLE }}>
    <button onClick={() => setView('points')}
      className="py-2.5 rounded-xl font-extrabold tracking-tight uppercase flex items-center justify-center gap-1.5 transition-all"
      style={{
        backgroundColor: view === 'points' ? `${T.cyan}18` : 'transparent',
        color: view === 'points' ? T.cyan : T.muted,
        fontSize: 11,
      }}>
      <Flame size={12} /> Points
    </button>
    <button onClick={() => setView('nft')}
      className="py-2.5 rounded-xl font-extrabold tracking-tight uppercase flex items-center justify-center gap-1.5 transition-all"
      style={{
        backgroundColor: view === 'nft' ? `${T.warning}18` : 'transparent',
        color: view === 'nft' ? T.warning : T.muted,
        fontSize: 11,
      }}>
      <Fingerprint size={12} /> NFT
    </button>
  </div>

  {/* Leaderboard */}
  <div className="w-full p-4 rounded-2xl border" style={{ ...GLASS_PANEL_STYLE }}>
    <div className="flex items-center justify-between mb-3">
      <p className="font-extrabold tracking-tight uppercase" style={{ color: T.text1, fontSize: 13 }}>
        {view === 'points' ? '🔥 Top 100 Points' : '☠️ Top 100 NFTs'}
      </p>
      <span className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 10 }}>
        {view === 'points' ? `${activeTotal} users total` : `${users.length} shown`}
      </span>
    </div>

    {loading ? (
      <div className="flex items-center justify-center py-8">
        <p className="font-mono italic uppercase animate-pulse" style={{ color: T.muted, fontSize: 10 }}>Loading rankings...</p>
      </div>
    ) : activeUsers.length === 0 ? (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="text-3xl">☠️</p>
        <p className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 11 }}>
          {view === 'points' ? 'No rankings yet' : 'No NFT rankings yet'}
        </p>
        <p className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 9 }}>
          {view === 'points' ? 'Earn points in Rewards to appear here!' : 'Mint your X-RAY NFT to appear here!'}
        </p>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {/* Podium */}
        {podium.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-2">
            {[podium[1], podium[0], podium[2]].map((user, idx) => {
              if (!user) return <div key={`empty-${idx}`} />;
              const t = getTierFromPoints(getTotalScore(user));
              const identity = getIdentityClass(getTotalScore(user));
              const nftCount = getNftCount(user);
              const tc = user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : '#CD7F32';
              const isCenter = user.rank === 1;
              return (
                <div key={`podium-${user.fid}`} className="rounded-2xl border p-2.5 text-center relative overflow-hidden"
                  style={{
                    backgroundColor: `${tc}12`,
                    borderColor: `${tc}44`,
                    transform: isCenter ? 'translateY(-4px)' : 'none',
                    boxShadow: isCenter ? `0 0 24px ${tc}66` : 'none',
                  }}>
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 font-extrabold tracking-tight" style={{ color: tc, fontSize: 21, opacity: 0.3 }}>
                    #{user.rank}
                  </div>
                  <p className="font-extrabold tracking-tight mb-1 mt-2" style={{ color: tc, fontSize: 13 }}>{user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}</p>
                  {user.pfpUrl ? (
                    <div className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden border" style={{ borderColor: tc }}>
                      <NextImage src={user.pfpUrl} alt={user.username} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-12 h-12 mx-auto rounded-xl border flex items-center justify-center" style={{ borderColor: tc, color: tc }}>☠️</div>
                  )}
                  <p className="font-extrabold tracking-tight truncate mt-1" style={{ color: T.text1, fontSize: 10 }}>@{user.username}</p>
                  <p className="font-mono uppercase italic truncate" style={{ color: identity.accent, fontSize: 8 }}>{identity.label}</p>
                  <p className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 8 }}>
                    {view === 'points' ? `${getTotalScore(user)} pts` : `${nftCount} NFTs`}
                  </p>
                  {view === 'nft' && (
                    <p className="font-mono italic uppercase" style={{ color: T.warning, fontSize: 8 }}>
                      {nftCount} NFT{nftCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* List */}
        {listUsers.map(user => {
          const t    = getTierFromPoints(getTotalScore(user));
          const identity = getIdentityClass(getTotalScore(user));
          const nftCount = getNftCount(user);
          const tc   = TIER_COLORS[t.label];
          const isMe = user.fid === fid;
          return (
            <div key={user.fid}
              className="flex items-center justify-between p-3 rounded-xl border transition-all"
              style={{
                ...GLASS_INNER_STYLE,
                backgroundColor: isMe ? 'rgba(18, 42, 60, 0.58)' : GLASS_INNER_STYLE.backgroundColor,
                borderColor:      isMe ? `${T.cyan}70` : GLASS_INNER_STYLE.borderColor,
              }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-black flex-shrink-0"
                  style={{ ...GLASS_INNER_STYLE, color: T.muted, fontSize: 10 }}>
                  #{user.rank}
                </div>
                {user.pfpUrl ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden border flex-shrink-0"
                    style={{ borderColor: isMe ? T.cyan : tc }}>
                    <NextImage src={user.pfpUrl} alt={user.username} width={28} height={28} className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ ...GLASS_INNER_STYLE, color: tc, fontSize: 10 }}>☠️</div>
                )}
                <div>
                  <p className="font-extrabold tracking-tight" style={{ color: isMe ? T.cyan : T.text1, fontSize: 11 }}>
                    @{user.username}{isMe ? ' (you)' : ''}
                  </p>
                  <div className="flex items-center gap-1">
                    {view === 'points' ? (
                      <>
                        <span className="font-mono italic uppercase" style={{ color: identity.accent, fontSize: 8 }}>{identity.label}</span>
                      </>
                    ) : (
                      <span className="font-mono italic uppercase" style={{ color: T.warning, fontSize: 8 }}>
                        {getNftCount(user)} NFT{getNftCount(user) !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold tracking-tight tabular-nums" style={{ color: isMe ? T.cyan : tc, fontSize: 13 }}>
                  {view === 'points'
                  ? <>{getTotalScore(user).toLocaleString()} <span className="font-mono" style={{ color: T.muted, fontSize: 9 }}>pts</span></>
                  : <>{nftCount.toLocaleString()} <span className="font-mono" style={{ color: T.muted, fontSize: 9 }}>NFTs</span></>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────────────────────────────
function ProfileTab({
  fid,
  pfp,
  username,
  address,
  followers,
  rank,
  contextWallets,
}: {
  fid: number | null;
  pfp: string | null;
  username: string | null;
  address?: string;
  followers?: number | null;
  rank?: number | null;
  contextWallets?: string[];
}) {
  const [loadingStats, setLoadingStats] = useState(true);
  const [nfts, setNfts]                  = useState<{ tokenId: string; name: string; imageUrl: string | null; openseaUrl: string }[]>([]);
  const [loadingNfts, setLoadingNfts]   = useState(false);
  const [nftCount, setNftCount]         = useState(0);
  const [farcasterWallets, setFarcasterWallets] = useState<string[]>([]);
  const [farcasterWalletsLoading, setFarcasterWalletsLoading] = useState(true);
  const [syncedPoints, setSyncedPoints] = useState(() => getPoints(fid));
  const [nftSources, setNftSources] = useState<string[]>([]);
  const [neynarScore, setNeynarScore] = useState<number>(0);
  const neynarScoreRef = useRef(0);
  const [localFollowers, setLocalFollowers] = useState<number | null>(null);

  useEffect(() => {
    if (!fid) {
      setFarcasterWallets([]);
      setLoadingStats(false);
      setFarcasterWalletsLoading(false);
      return;
    }

    const controller = new AbortController();
    const immediateWallets = Array.from(
      new Set((contextWallets || []).map((w) => normalizeAddress(w)).filter((w): w is string => !!w))
    );

    setFarcasterWalletsLoading(true);
    setLoadingStats(true);
    setSyncedPoints(getPoints(fid));

    if (immediateWallets.length > 0) {
      setFarcasterWallets(immediateWallets);
      setFarcasterWalletsLoading(false);
    }

    fetch(`/api/profile/${fid}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;

        const followerCount = Number(data?.follower_count);
        if (Number.isFinite(followerCount) && followerCount >= 0) {
          setLocalFollowers(followerCount);
        }

        const ns =
          data?.score ??
          data?.neynarScore ??
          data?.neynar_score ??
          data?.profile?.neynarScore ??
          data?.profile?.neynar_score ??
          null;
        if (ns !== null && ns !== undefined && Number.isFinite(Number(ns))) {
          setNeynarScore(Number(ns));
        }

        const allWallets: string[] = [
          ...(Array.isArray(data?.wallets) ? data.wallets : []),
          ...(Array.isArray(data?.secondaryWallets) ? data.secondaryWallets : []),
        ].filter(Boolean);

        const neynarWallets = Array.from(
          new Set(
            allWallets
              .map((w: unknown) => normalizeAddress(typeof w === 'string' ? w : null))
              .filter((w: string | null): w is string => !!w)
          )
        );

        const merged = Array.from(new Set([...immediateWallets, ...neynarWallets]));
        setFarcasterWallets(merged);
      })
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') return;
      })
      .finally(() => {
        setLoadingStats(false);
        setFarcasterWalletsLoading(false);
      });

    return () => controller.abort();
  }, [fid, contextWallets]);

  useEffect(() => {
    if (!fid) return;
    fetch(`/api/leaderboard/${fid}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (typeof data?.points === 'number') {
          safeStorage.setItem(fidKey(fid, 'points'), String(data.points));
          setSyncedPoints(data.points);
        }
      })
      .catch(() => {});
  }, [fid]);

  useEffect(() => {
    if (farcasterWalletsLoading) return;
    if (!fid && !address && !farcasterWallets.length) {
      setLoadingNfts(false);
      return;
    }

    const runtimeAddress = normalizeAddress(address ?? null);
    const contextNormalized = (contextWallets ?? [])
      .map((w) => normalizeAddress(w))
      .filter((w): w is string => !!w);

    const allAddresses = Array.from(
      new Set([runtimeAddress, ...farcasterWallets, ...contextNormalized].filter(Boolean))
    );

    const controller = new AbortController();
    let isActive = true;

    async function loadNfts() {
      setLoadingNfts(true);
      try {
        // 1) Wallet scan (when addresses are available)
        if (allAddresses.length > 0) {
          const params = allAddresses.map((a) => `address=${a}`).join('&');
          const res = await fetch(`/api/nfts?${params}`, { signal: controller.signal });
          if (res.ok) {
            const data = await res.json();
            if (!isActive) return;
            const count = Number(data.total ?? data.count ?? 0);
            const nftList = Array.isArray(data.nfts) ? data.nfts : [];
            if (nftList.length > 0 || count > 0) {
              setNftCount(count);
              setNfts(nftList);
              setNftSources(data.sources ?? ['onchain']);
              return;
            }
          }
        }

        setNftCount(0);
        setNfts([]);
        setNftSources([]);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        if (!isActive) return;
        setNftCount(0);
        setNfts([]);
        setNftSources([]);
      } finally {
        if (isActive) setLoadingNfts(false);
      }
    }

    loadNfts();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [address, fid, farcasterWallets, farcasterWalletsLoading, contextWallets]);

  const displayFollowers = localFollowers ?? followers;

  return (
    <div className="flex flex-col gap-4 w-full pb-4">
      {/* A. ResultIdentityCard (Topo) */}
      <div className="w-full">
        <ResultIdentityCard
          username={username}
          pfpUrl={pfp}
          score={syncedPoints}
          nftCount={nftCount}
          rank={rank ?? null}
          fid={fid}
          followers={displayFollowers}
          address={address}
        />
      </div>

      {/* B. Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl border flex flex-col justify-center" style={{ ...GLASS_INNER_STYLE }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp className="w-4 h-4" style={{ color: T.cyan }} />
            <span className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 9 }}>X-Ray Points</span>
          </div>
          <span className="font-extrabold tracking-tight text-2xl tabular-nums leading-none" style={{ color: T.cyan }}>{syncedPoints}</span>
        </div>
        <div className="p-4 rounded-2xl border flex flex-col justify-center" style={{ ...GLASS_INNER_STYLE }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star className="w-4 h-4" style={{ color: '#A855F7' }} />
            <span className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 9 }}>Neynar Score</span>
          </div>
          <span className="font-extrabold tracking-tight text-2xl tabular-nums leading-none" style={{ color: T.text2 }}>
            {neynarScore > 0 ? neynarScore.toFixed(2) : '0.00'}
          </span>
        </div>
      </div>

      {/* C. Action Button */}
      <button
        onClick={() => {
          sdk.actions.composeCast({
            text: `☠️ X-RAY Identity Scanned\n\nRank: ${rank || 'N/A'}\nPoints: ${syncedPoints}\nNFTs: ${nftCount}\n\nScan your radiographic footprint on Base ↓`,
            embeds: [MINI_APP_SHARE_URL]
          });
        }}
        className="w-full py-4 rounded-2xl font-extrabold tracking-tight uppercase text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
        style={{ background: 'linear-gradient(90deg, #5E72FF 0%, #4F46E5 100%)', color: T.text1, letterSpacing: '0.05em', boxShadow: '0 8px 24px rgba(94,114,255,0.25)' }}
      >
        SHARE REPUTATION SCORES ↗
      </button>

      {/* D. NFT Master Box */}
      <div className="p-6 border relative overflow-hidden" style={{ backgroundColor: 'rgba(16, 24, 40, 0.46)', borderColor: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '2.5rem' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☠️</span>
            <h3 className="font-extrabold tracking-tight uppercase text-sm tracking-widest" style={{ color: T.text1 }}>XRAY NFTs</h3>
          </div>
          <span className="font-mono px-3 py-1.5 rounded-full border font-extrabold tracking-tight uppercase"
            style={{ backgroundColor: `${T.cyan}18`, borderColor: `${T.cyan}33`, color: T.cyan, fontSize: 10 }}>
            {loadingNfts ? '...' : `${nftCount} NFT'S`}
          </span>
        </div>
        
        {!loadingNfts && nftSources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {nftSources.map((source) => (
              <span
                key={source}
                className="font-mono italic uppercase px-2 py-0.5 rounded-full border"
                style={{
                  fontSize: 8,
                  color: T.muted,
                  borderColor: '#ffffff14',
                  backgroundColor: '#ffffff08',
                }}
              >
                {source}
              </span>
            ))}
          </div>
        )}

        {loadingNfts ? (
          <div className="flex items-center justify-center py-8">
            <p className="font-mono italic uppercase animate-pulse font-black tracking-widest" style={{ color: T.muted, fontSize: 10 }}>SCANNING WALLETS...</p>
          </div>
        ) : nfts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {nfts.map(nft => (
              <a key={nft.tokenId} href={nft.openseaUrl} target="_blank" rel="noopener noreferrer"
                className="relative rounded-2xl overflow-hidden border aspect-square group"
                style={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.05)' }}>
                {nft.imageUrl
                  ? <NextImage src={nft.imageUrl} alt={nft.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  : <div className="w-full h-full flex items-center justify-center text-3xl">☠️</div>}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                  <p className="font-mono font-extrabold tracking-tight uppercase text-center" style={{ color: T.cyan, fontSize: 10 }}>{nft.name}</p>
                </div>
              </a>
            ))}
          </div>
        ) : nftCount > 0 ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <p className="text-3xl">🧬</p>
            <p className="font-mono italic uppercase font-black" style={{ color: T.text1, fontSize: 11 }}>{nftCount} X-RAY NFT{nftCount > 1 ? 's' : ''} Secured</p>
            <p className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 9 }}>On-chain balance verified via Base</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-8 text-center opacity-60 grayscale">
            <p className="text-5xl drop-shadow-xl mb-1">☠️</p>
            <p className="font-mono italic font-black uppercase tracking-widest" style={{ color: T.text1, fontSize: 13 }}>NO X-RAY NFTS FOUND</p>
            <p className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 10 }}>MINT YOURS ON THE X-RAY TAB</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION MODAL
// ─────────────────────────────────────────────────────────────────────────────
function NotificationModal({ hasMinted, loading, success, onAdd, onDismiss }: {
hasMinted: boolean; loading: boolean; success: boolean; onAdd: () => void; onDismiss: () => void;
}) {
return (
<div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
<div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} />
<div className="relative w-full max-w-[340px] rounded-[2.5rem] border overflow-hidden shadow-2xl"
style={{ backgroundColor: T.cardAlt, borderColor: '#ffffff10' }}>
<button onClick={onDismiss}
className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
style={{ backgroundColor: '#ffffff08' }}>
<X className="w-4 h-4" style={{ color: T.muted }} />
</button>
<div className="flex justify-center pt-10 pb-4">
<div className="w-16 h-16 rounded-full flex items-center justify-center"
style={{ backgroundColor: T.cyan }}>
<Bell className="w-8 h-8" style={{ color: T.bg }} />
</div>
</div>
<div className="px-8 pb-8 text-center">
{success ? (
<>
<div className="mb-4 p-4 rounded-2xl border"
style={{ backgroundColor: `${T.cyan}12`, borderColor: `${T.cyan}33` }}>
<span className="text-2xl block mb-1">✅</span>
<p className="font-mono font-black uppercase italic" style={{ color: T.cyan, fontSize: 13 }}>X-RAY Protocol Added!</p>
</div>
<button onClick={onDismiss}
className="w-full py-4 rounded-2xl font-black uppercase italic"
style={{ backgroundColor: T.cyan, color: T.bg, fontSize: 13 }}>
Continue
</button>
</>
) : (
<>
<h2 className="text-xl font-extrabold tracking-tight uppercase mb-2" style={{ color: T.text1 }}>
{hasMinted ? 'Your X-RAY is on-chain! ☠️' : 'Never miss a drop!'}
</h2>
<p className="font-mono italic uppercase leading-relaxed mb-6" style={{ color: T.muted, fontSize: 11 }}>
{hasMinted ? 'Enable notifications to get Airdrop alerts.' : 'Add X-RAY & enable notifications for DNA alerts and drops.'}
</p>
<button onClick={onAdd} disabled={loading}
className="w-full py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 mb-3"
style={{ backgroundColor: loading ? `${T.cyan}60` : T.cyan, color: T.bg, fontSize: 13 }}>
<Bell className="w-4 h-4" />
{loading ? 'Adding...' : '🔔 Add App & Get Alerts'}
</button>
<button onClick={onDismiss}
className="w-full py-3 rounded-2xl font-mono italic uppercase border"
style={{ backgroundColor: '#ffffff05', borderColor: '#ffffff10', color: T.muted, fontSize: 11 }}>
Maybe Later
</button>
</>
)}
</div>
</div>
</div>
);
}

// ─────────────────────────────────────────────────────────────────────────────
// WELCOME MODAL (FIRST VISIT)
// ─────────────────────────────────────────────────────────────────────────────
function WelcomeModal({
  onClose,
  onAddMiniApp,
  onEnableNotifications,
  canAdd,
  canEnableNotifications,
  loading,
}: {
  onClose: () => void;
  onAddMiniApp: () => void;
  onEnableNotifications: () => void;
  canAdd: boolean;
  canEnableNotifications: boolean;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center p-6">
      <div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: 'rgba(0,0,0,0.92)' }} />
      <div className="relative w-full max-w-[360px] rounded-[2.5rem] border overflow-hidden shadow-2xl"
        style={{ backgroundColor: T.cardAlt, borderColor: '#ffffff10' }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{ backgroundColor: '#ffffff08' }}>
          <X className="w-4 h-4" style={{ color: T.muted }} />
        </button>
        <div className="flex justify-center pt-10 pb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: T.cyan }}>
            <Bell className="w-8 h-8" style={{ color: T.bg }} />
          </div>
        </div>
        <div className="px-8 pb-8 text-center">
          <h2 className="text-xl font-extrabold tracking-tight uppercase mb-2" style={{ color: T.text1 }}>
            Welcome to XRAY
          </h2>
          <p className="font-mono italic uppercase leading-relaxed mb-6" style={{ color: T.muted, fontSize: 11 }}>
            Add the mini app and enable notifications so you never miss rewards.
          </p>

          {canAdd && (
            <button onClick={onAddMiniApp} disabled={loading}
              className="w-full py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 mb-3"
              style={{ backgroundColor: loading ? `${T.cyan}60` : T.cyan, color: T.bg, fontSize: 13 }}>
              {loading ? 'Adding...' : 'Add Mini App'}
            </button>
          )}

          {canEnableNotifications && (
            <button onClick={onEnableNotifications} disabled={loading}
              className="w-full py-3 rounded-2xl font-black uppercase italic border mb-3"
              style={{ backgroundColor: '#ffffff05', borderColor: '#ffffff10', color: T.text1, fontSize: 12 }}>
              {loading ? 'Enabling...' : 'Enable Notifications'}
            </button>
          )}

          <button onClick={onClose}
            className="w-full py-3 rounded-2xl font-mono italic uppercase border"
            style={{ backgroundColor: '#ffffff05', borderColor: '#ffffff10', color: T.muted, fontSize: 11 }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCAN DNA
// ─────────────────────────────────────────────────────────────────────────────
function ScanDNA({ pfpUrl, loading, resultImage, loadingMessage, showOnChainBadge = false }: {
pfpUrl: string | null; loading: boolean; resultImage: string | null; loadingMessage?: string; showOnChainBadge?: boolean;
}) {
return (
<div className="relative w-full aspect-square rounded-[48px] overflow-hidden border flex items-center justify-center"
style={{
...GLASS_HIGHLIGHT_STYLE,
borderColor: 'rgba(76,214,255,0.45)',
boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 20px rgba(76,214,255,0.20), 0 14px 30px rgba(0,0,0,0.28)',
}}>
<div className="absolute inset-0 opacity-[0.07]"
style={{ backgroundImage: `radial-gradient(${T.cyan} 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

  {resultImage ? (
    <div className="w-full h-full relative z-30 animate-in fade-in zoom-in duration-1000">
      <NextImage src={resultImage} alt="X-Ray Result" fill className="object-cover" unoptimized />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundColor: T.cyan }} />
    </div>
  ) : pfpUrl ? (
    <div className="relative w-full h-full flex items-center justify-center">
      <NextImage src={pfpUrl} alt="Subject" fill unoptimized
        className={`object-cover transition-all duration-1000 z-0 grayscale brightness-[0.3] ${loading ? 'animate-pulse scale-110 blur-sm' : ''}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      {!loading && (
        <div className="absolute flex flex-col items-center gap-2 opacity-25 z-20">
          <div className="w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-md"
            style={{ borderColor: `${T.cyan}40`, backgroundColor: `${T.cyan}08` }}>
            <Dna className="w-6 h-6" style={{ color: T.cyan }} />
          </div>
          <span className="font-mono uppercase font-bold" style={{ color: T.cyan, fontSize: 8, letterSpacing: '0.5em' }}>READY</span>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 opacity-20">
      <Cpu className="w-12 h-12 animate-spin" style={{ color: T.text1 }} />
      <div className="font-mono uppercase font-black" style={{ color: T.text1, fontSize: 10, letterSpacing: '0.3em' }}>Syncing...</div>
    </div>
  )}

  {loading && (
    <div className="absolute inset-0 z-40 pointer-events-none">
      <div className="w-full h-[2px] animate-scan-line absolute"
        style={{ backgroundColor: T.cyan, boxShadow: `0 0 20px ${T.cyan}` }} />
    </div>
  )}

  {(loading || !resultImage || showOnChainBadge) && (
    <div className="absolute bottom-7 left-0 w-full px-8 z-50 text-center">
      <div className="inline-flex items-center justify-center backdrop-blur-xl px-6 py-2.5 rounded-full border shadow-2xl"
        style={showOnChainBadge
          ? { backgroundColor: 'rgba(12,22,36,0.90)', borderColor: 'rgba(76,214,255,0.34)', boxShadow: `0 0 24px ${T.cyan}22` }
          : { backgroundColor: 'rgba(14,17,23,0.92)', borderColor: '#ffffff10' }}>
        <span className="font-mono uppercase font-extrabold tracking-tight" style={{ color: showOnChainBadge ? T.cyan : T.text2, fontSize: 9, letterSpacing: showOnChainBadge ? '0.18em' : '0.4em' }}>
          {loading ? loadingMessage : showOnChainBadge ? '☠️ YOUR X-RAY IS ON-CHAIN' : 'MINT 1 NFT XRAY TO PLAY'}
        </span>
      </div>
    </div>
  )}
</div>

);
}

function ResultIdentityCard({
  username,
  pfpUrl,
  score,
  nftCount,
  rank,
  fid,
  followers,
  address,
}: {
  username: string | null;
  pfpUrl: string | null;
  score: number;
  nftCount: number;
  rank: number | null;
  fid?: number | null;
  followers?: number | null;
  address?: string | null;
}) {
  const identity = getIdentityClass(score);
  return (
    <div
      className="w-full rounded-[2.5rem] border p-5 relative overflow-hidden shadow-2xl"
      style={{
        backgroundColor: 'rgba(16, 24, 40, 0.46)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: `radial-gradient(${T.cyan} 0.7px, transparent 0.7px)`, backgroundSize: '18px 18px' }} />
      <div className="absolute left-0 right-0 h-[2px] animate-scan-line pointer-events-none z-20" style={{ background: T.cyan, boxShadow: `0 0 15px ${T.cyan}, 0 0 30px ${T.cyan}` }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* A. Cabeçalho (Header) */}
        <div className="text-center mb-5">
          <p className="font-black uppercase italic" style={{ color: T.text1, fontSize: 16, letterSpacing: '0.3em', fontFamily: FONT_DISPLAY }}>
            X-RAY PROTOCOL
          </p>
          <p className="font-mono uppercase italic mt-1" style={{ color: '#a9b7d2', fontSize: 10 }}>
            Radiographic Identity
          </p>
          <div className="mt-4 mx-auto w-3/4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${T.cyan}2a, transparent)` }} />
        </div>

        {/* C. Layout do Conteúdo */}
        <div className="flex justify-between items-start mt-2">
          {/* Coluna da Esquerda (Identidade) */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-[3px]" style={{ borderColor: identity.accent, boxShadow: `0 0 20px ${identity.accent}66` }}>
              {pfpUrl ? <NextImage src={pfpUrl} alt={username || 'user'} fill className="object-cover" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-3xl">☠️</div>}
            </div>
            
            <span
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border font-extrabold tracking-tight uppercase"
              style={{
                fontSize: 11,
                backgroundColor: `${identity.accent}1a`,
                borderColor: `${identity.accent}4a`,
                color: identity.accent,
                letterSpacing: '0.07em',
                fontFamily: FONT_UI,
              }}
            >
              {identity.label}
            </span>

          </div>

          {/* Coluna da Direita (Dados Técnicos) */}
          <div className="flex flex-col gap-2">
            <div className="w-[110px] px-3 py-2 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 8 }}>Rank</span>
                  <span className="font-mono uppercase italic font-black tabular-nums truncate" style={{ color: T.text1, fontSize: 10 }}>{rank ? `${rank}°` : '—'}</span>
            </div>
            <div className="w-[110px] px-3 py-2 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 8 }}>FID</span>
                  <span className="font-mono uppercase italic font-black tabular-nums truncate" style={{ color: T.text1, fontSize: 10 }}>#{fid || '—'}</span>
            </div>
            <div className="w-[110px] px-3 py-2 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-mono uppercase italic" style={{ color: T.muted, fontSize: 8 }}>Followers</span>
                  <span className="font-mono uppercase italic font-black tabular-nums truncate" style={{ color: T.text1, fontSize: 10 }}>{followers !== null && followers !== undefined ? followers.toLocaleString() : '—'}</span>
            </div>
            <div className="w-[110px] px-3 py-2 rounded-xl border flex flex-col justify-center" style={{ backgroundColor: 'rgba(60,242,255,0.04)', borderColor: 'rgba(60,242,255,0.15)' }}>
              <span className="font-mono uppercase italic" style={{ color: T.cyan, fontSize: 8, opacity: 0.6 }}>Wallet</span>
              <span className="font-mono uppercase italic font-black truncate" style={{ color: T.cyan, fontSize: 10 }}>{address ? `${address.slice(0, 6)}...${address.slice(-3)}` : '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OPENSEA BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function OpenSeaButton({ compact = false }: { compact?: boolean }) {
if (compact) {
return (
<a href={OPENSEA_COLLECTION_URL} target="_blank" rel="noopener noreferrer"
className="group w-full h-full min-h-[58px] flex items-center justify-center gap-2 px-4 py-3 rounded-[1.2rem] border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
style={{
  background: 'linear-gradient(135deg, #1868b7 0%, #2081e2 50%, #5ba3f5 100%)',
  borderColor: 'rgba(32,129,226,0.5)',
  boxShadow: '0 0 22px rgba(32,129,226,0.35)',
}}>
<span className="font-extrabold tracking-tight uppercase text-center leading-none" style={{ color: '#FFFFFF', fontSize: 10, letterSpacing: '0.06em' }}>
View Collection
</span>
<ExternalLink className="w-3.5 h-3.5 group-hover:opacity-80 transition-opacity flex-shrink-0" style={{ color: '#FFFFFF' }} />
</a>
);
}

return (
<a href={OPENSEA_COLLECTION_URL} target="_blank" rel="noopener noreferrer"
className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
style={{ background: 'linear-gradient(135deg, #1868b7 0%, #2081e2 50%, #5ba3f5 100%)', borderColor: 'rgba(32,129,226,0.4)', boxShadow: '0 0 24px rgba(32,129,226,0.2)' }}>
<div className="flex flex-col items-start">
<span className="font-extrabold tracking-tight uppercase" style={{ color: T.text1, fontSize: 13, letterSpacing: '0.05em' }}>View Collection</span>
<span className="font-mono italic uppercase" style={{ color: T.text2, fontSize: 9, letterSpacing: '0.1em' }}>OpenSea • X-RAY Protocol</span>
</div>
<ExternalLink className="ml-auto w-4 h-4 group-hover:text-white/80 transition-colors flex-shrink-0" style={{ color: T.muted }} />
</a>
);
}

// ─────────────────────────────────────────────────────────────────────────────
// TABS CONFIG
// ─────────────────────────────────────────────────────────────────────────────
type Tab = 'xray' | 'rewards' | 'stake' | 'leaderboard' | 'profile';
const TABS: { id: Tab; icon: string; label: string }[] = [
{ id: 'xray',        icon: '☠️', label: 'X-RAY'  },
{ id: 'rewards',     icon: '⚡', label: 'Rewards' },
{ id: 'stake',       icon: '🔒', label: 'Stake'    },
{ id: 'leaderboard', icon: '🏆', label: 'Rank'     },
{ id: 'profile',     icon: '👤', label: 'Profile' },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
const [isLanding, setIsLanding]   = useState(true);
const [activeTab, setActiveTab]   = useState<Tab>('xray');
const hasHeavyBgShadow = activeTab === 'rewards' || activeTab === 'stake' || activeTab === 'leaderboard' || activeTab === 'profile';
const topTabTitle = activeTab === 'rewards'
? 'REWARDS'
: activeTab === 'stake'
? 'STAKING'
// MUDANÇA #3: Correção do typo LEADBOARD -> LEADERBOARD
: activeTab === 'leaderboard'
? 'LEADERBOARD'
: null;
const [fid, setFid]                = useState<number | null>(null);
const [pfp, setPfp]                = useState<string | null>(null);
const [username, setUsername]      = useState<string | null>(null);
const [lockedFid, setLockedFid]    = useState<number | null>(null);
const [lockedPfp, setLockedPfp]    = useState<string | null>(null);
const [isLoaded, setIsLoaded]      = useState(false);
const [isMiniAppRuntime, setIsMiniAppRuntime] = useState(false);

const [loading, setLoading]                = useState(false);
const [resultImage, setResultImage]        = useState<string | null>(null);
const [resultMetadata, setResultMetadata] = useState<Record<string, unknown> | null>(null);
const [mintCount, setMintCount]            = useState<number | null>(null);
const [showInfo, setShowInfo]              = useState(false);
const [loadingMessage, setLoadingMessage] = useState('SEQUENCING...');
const [errorMessage, setErrorMessage]      = useState<string | null>(null);
const [alreadyMinted, setAlreadyMinted]    = useState(false);
const [shareImageUrl, setShareImageUrl]    = useState<string | null>(null);
const shareImageUrlRef = useRef<string | null>(null);
const [showNotifModal, setShowNotifModal] = useState(false);
const [showWelcomeModal, setShowWelcomeModal] = useState(false);
const [miniAppAdded, setMiniAppAdded] = useState(false);
const [notificationsEnabled, setNotificationsEnabled] = useState(false);
const [isMobileRuntime, setIsMobileRuntime] = useState(false);
const [notifLoading, setNotifLoading]      = useState(false);
const [notifSuccess, setNotifSuccess]      = useState(false);
const [hasMintedNft, setHasMintedNft]      = useState(false);
const [profileFollowers, setProfileFollowers] = useState<number | null>(null);
const isSyncingRef = useRef(false);
const [liveScore, setLiveScore]            = useState(0);
const [liveNftCount, setLiveNftCount]      = useState(0);
const [liveRank, setLiveRank]              = useState<number | null>(null);
const [contextVerifiedWallets, setContextVerifiedWallets] = useState<string[]>([]);

const { address, isConnected }                                       = useAccount();
const chainId                                                        = useChainId();
const { switchChainAsync }                                            = useSwitchChain();
const { writeContractAsync, data: txHash, error: writeContractError } = useWriteContract();
const { isLoading: isConfirming, isSuccess: isMintSuccess }           = useWaitForTransactionReceipt({ hash: txHash });

const subjectFid  = lockedFid ?? fid;
const subjectPfp  = lockedPfp ?? pfp;
const mintDisplay = getMintDisplayInfo(mintCount);
const collection  = Array.from({ length: 13 }, (_, i) => `/nft${i + 1}.png`);

const refreshLiveIdentity = useCallback(async () => {
if (!subjectFid) return;
try {
const lbRes = await fetch(`/api/leaderboard/${subjectFid}`, { cache: 'no-store' });
const lbData = lbRes.ok ? await lbRes.json() : null;
if (typeof lbData?.points === 'number') {
safeStorage.setItem(fidKey(subjectFid, 'points'), String(lbData.points));
setLiveScore(lbData.points);
}
if (typeof lbData?.nftCount === 'number') setLiveNftCount(lbData.nftCount);

const topRes = await fetch('/api/leaderboard/top?limit=100', { cache: 'no-store' });
const topData = topRes.ok ? await topRes.json() : null;
if (Array.isArray(topData?.users)) {
const mine = topData.users.find((u: { fid?: number; rank?: number }) => Number(u?.fid) === subjectFid);
if (mine && Number.isFinite(Number(mine.rank))) setLiveRank(Number(mine.rank));
}
} catch {
/* silent */
}
}, [subjectFid]);

const syncLeaderboard = useCallback(async (_pts: number, _hasNft: boolean) => {
if (!subjectFid || !isMiniAppRuntime || isSyncingRef.current) return;
isSyncingRef.current = true;
try {
await sdk.quickAuth.fetch('/api/leaderboard', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username: username || `fid_${subjectFid}`, pfpUrl: subjectPfp || null }),
});
} catch { /* silent */ }
finally { isSyncingRef.current = false; }
await refreshLiveIdentity();
}, [subjectFid, username, subjectPfp, isMiniAppRuntime, refreshLiveIdentity]);

const handleShareNft = useCallback(async () => {
if (!subjectFid) return;
const rc = getRandomChannel();

let imageUrl = shareImageUrlRef.current;
if (!imageUrl) {
  try {
    const res = await fetch(`/api/mint/nft/${subjectFid}`);
    if (res.ok) {
      const d = await res.json();
      if (d?.image) imageUrl = resolveIpfsUrl(d.image);
    }
  } catch { /* silent */ }
}

const textToShare = `☠️ XRAY is live!\n\nYour participation determines your access.\n\nStay active → Earn Tokens → Secure your STAKE 🎟\n\nEvery action counts. The more NFTs linked to your wallet, the greater the profit.\n\nPlay. Participate. Claim your spot. ⚡ @euvouserdoutor`;
const embeds: [string] | [string, string] = imageUrl ? [MINI_APP_SHARE_URL, imageUrl] : [MINI_APP_SHARE_URL];

await sdk.actions.composeCast({
text: textToShare,
embeds: embeds,
channelKey: rc,
});
}, [subjectFid]);

// Mint count polling
useEffect(() => {
let retryTimeout: ReturnType<typeof setTimeout>;
async function loadMintCount() {
try {
const res  = await fetch('/api/mint/count');
const data = await res.json();
if (typeof data.count === 'number' && data.count >= 0) setMintCount(data.count);
else retryTimeout = setTimeout(loadMintCount, 3000);
} catch { retryTimeout = setTimeout(loadMintCount, 3000); }
}
loadMintCount();
const interval = setInterval(loadMintCount, 30_000);
return () => { clearInterval(interval); clearTimeout(retryTimeout); };
}, []);

// MUDANÇA #6: composeCast automático 1.5s após isMintSuccess
useEffect(() => {
if (!isMintSuccess) return;
setMintCount(prev => (prev ?? 0) + 1);
if (subjectFid) fetch('/api/opensea/refresh', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fid: subjectFid }) }).catch(() => {});

    // Gatilho: Avisa o banco de dados que a Genesis NFT foi mintada com sucesso
    if (subjectFid) {
      fetch('/api/mint/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fid: subjectFid })
      }).catch(() => {});
    }

// Novo timer automático para compartilhamento
const timer = setTimeout(() => {
  handleShareNft();
}, 1500);
return () => clearTimeout(timer);
}, [isMintSuccess, subjectFid, handleShareNft]);

useEffect(() => {
if (writeContractError) setErrorMessage(writeContractError.message || 'Transaction failed.');
}, [writeContractError]);

// SDK init
useEffect(() => {
const init = async () => {
try {
await sdk.actions.ready().catch(() => undefined);
const inMiniApp = await sdk.isInMiniApp();
setIsMiniAppRuntime(inMiniApp);
if (!inMiniApp) {
setFid(12345); setPfp('https://placehold.co/400x400/141920/3CF2FF?text=PFP');
setUsername('preview_user');
setIsLoaded(true);
return;
}

setIsLoaded(true);

const [authResult, contextResult] = await Promise.allSettled([
  sdk.quickAuth.fetch('/api/me').then(async (r) => (r.ok ? r.json() : null)),
  sdk.context,
]);

const authFid =
  authResult.status === 'fulfilled' && Number.isFinite(Number(authResult.value?.fid))
    ? Number(authResult.value?.fid)
    : null;
const context = contextResult.status === 'fulfilled' ? contextResult.value : null;

if (context?.user) {
const contextFid = Number(context.user.fid);
const useAuthFid = Number.isFinite(authFid) && Number(authFid) > 0;
const useContextFid = Number.isFinite(contextFid) && contextFid > 0;
const userFid = useAuthFid ? Number(authFid) : (useContextFid ? contextFid : null);
if (!userFid) return;

const sameIdentity = useContextFid && contextFid === userFid;
const safePfp = sameIdentity ? (context.user.pfpUrl || '') : '';
const safeUsername = sameIdentity
  ? (context.user.username || `fid_${userFid}`)
  : `fid_${userFid}`;

setLockedFid(userFid); setLockedPfp(safePfp);
setFid(userFid); setPfp(safePfp);
setUsername(safeUsername);
setContextVerifiedWallets(
  sameIdentity
    ? Array.from(
        new Set(
          ((context as any)?.user?.verifiedAddresses?.ethAddresses || [])
            .map((w: unknown) => normalizeAddress(typeof w === 'string' ? w : null))
            .filter((w: string | null): w is string => !!w)
        )
      )
    : []
);
setIsMobileRuntime(context?.client?.platformType === 'mobile');

            // TAREFA 7: Restaura o estado da sessão do backend p/ iOS/Safari
            try {
              const stateRes = await fetch(`/api/user-state?fid=${userFid}`);
              if (stateRes.ok) {
                const { state } = await stateRes.json();
                if (state) {
                  Object.entries(state).forEach(([k, v]) => {
                    // Salva no memStore silenciosamente sem disparar o POST repetido
                    safeStorage.setItem(k, v as string, true);
                  });
                }
              }
            } catch { /* silent fallback */ }

const notifEnabled =
  sameIdentity && (
    !!(context as any)?.client?.notificationDetails ||
    !!(context as any)?.notificationDetails
  );
setNotificationsEnabled(notifEnabled);

let added = false;
try {
  const maybe = (sdk as any)?.miniapp?.isAdded;
  if (typeof maybe === 'function') {
    added = await maybe();
  }
} catch { /* best effort */ }
setMiniAppAdded(added);

if (notifEnabled) {
        await registerNotificationDetails(context as FarcasterContext);
}
const dismissed = safeStorage.getItem(NOTIF_DISMISSED_KEY);
if (!notifEnabled && !dismissed) {
try {
const verifiedAddresses = Array.from(
  new Set(
    (((context as FarcasterContext)?.user?.verifiedAddresses?.ethAddresses) || [])
      .map((wallet: string) => normalizeAddress(wallet))
      .filter((wallet: string | null): wallet is string => !!wallet)
  )
);
if (verifiedAddresses.length > 0) {
  const params = verifiedAddresses.map((wallet) => `address=${wallet}`).join('&');
  const nftRes = await fetch(`/api/nfts?skip-indexer=1&${params}`, { cache: 'no-store' });
  if (nftRes.ok) {
    const nftData = await nftRes.json();
    if (Number(nftData?.count || 0) > 0) setHasMintedNft(true);
  }
}
} catch { /* silent */ }
}
setTimeout(async () => {
try {
await sdk.quickAuth.fetch('/api/leaderboard', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
username: safeUsername,
pfpUrl: safePfp || null,
}),
});
} catch { /* silent */ }
}, 2000);
} else if (authFid) {
setLockedFid(authFid);
setFid(authFid);
setUsername(`fid_${authFid}`);
}
} catch (e) { console.error(e); }
finally { setIsLoaded(true); }
};
init();
}, []);

useEffect(() => {
if (!subjectFid) return;
refreshLiveIdentity();
}, [subjectFid, refreshLiveIdentity]);

useEffect(() => {
if (activeTab !== 'profile' || !subjectFid) {
return;
}
if (profileFollowers !== null) return;
fetch(`/api/profile/${subjectFid}`, { cache: 'no-store' })
.then((r) => (r.ok ? r.json() : null))
.then((data) => {
const followerCount = Number(data?.follower_count);
setProfileFollowers(Number.isFinite(followerCount) ? followerCount : null);
})
.catch(() => setProfileFollowers(null));
}, [activeTab, subjectFid, profileFollowers]);

const handleAddMiniApp = async () => {
setNotifLoading(true);
try {
if (typeof (sdk.actions as any).addMiniApp === 'function') await (sdk.actions as any).addMiniApp();
else if (typeof (sdk.actions as any).addFrame === 'function') await (sdk.actions as any).addFrame();
const context = await sdk.context as FarcasterContext;
const registered = await registerNotificationDetails(context);
setNotifSuccess(registered);
setMiniAppAdded(true);
} catch (e: any) {
const reason = (e?.message || '').toLowerCase();
if (reason.includes('rejected') || reason.includes('cancel') || reason.includes('dismiss') || reason.includes('user denied')) handleDismissNotif();
} finally { setNotifLoading(false); }
};

const handleEnableNotifications = async () => {
  setNotifLoading(true);
  try {
    if (typeof (sdk.actions as any).requestNotifications === 'function') {
      await (sdk.actions as any).requestNotifications();
    }
    const context = await sdk.context as FarcasterContext;
    const registered = await registerNotificationDetails(context);
    setNotifSuccess(registered);
    setNotificationsEnabled(registered || !!getNotificationDetailsFromContext(context));
  } catch (e: any) {
    const reason = (e?.message || '').toLowerCase();
    if (reason.includes('rejected') || reason.includes('cancel') || reason.includes('dismiss') || reason.includes('user denied')) {
      handleDismissNotif();
    }
  } finally {
    setNotifLoading(false);
  }
};

const handleEnterApp = async () => {
try {
const inMiniApp = await sdk.isInMiniApp();
if (inMiniApp && !miniAppAdded) {
  try {
    if (typeof (sdk.actions as any).addMiniApp === 'function') {
      await (sdk.actions as any).addMiniApp();
    } else if (typeof (sdk.actions as any).addFrame === 'function') {
      await (sdk.actions as any).addFrame();
    }
    const context = await sdk.context;
    if (context) await registerNotificationDetails(context as FarcasterContext);
  } catch (error) {
    console.log("User closed install modal", error);
  }
}
} finally {
  setIsLanding(false);
}
};

const handleDismissNotif = () => {
  safeStorage.setItem(NOTIF_DISMISSED_KEY, '1');
setShowNotifModal(false); setNotifSuccess(false);
};

async function fetchExistingNftImage(
  fid: number,
  ownerAddress?: string
): Promise<string | null> {
  try {
    const url = ownerAddress
      ? `/api/mint/nft/${fid}?owner=${ownerAddress.toLowerCase()}`
      : `/api/mint/nft/${fid}`;

    const res = await fetch(url);

    if (res.status === 403) {
      console.log(`[init] token #${fid} exists but was transferred away`);
      return null;
    }
    if (!res.ok) {
      try {
        const proxyUrl = `/api/image/${fid}`;
        const proxyRes = await fetch(proxyUrl, { cache: 'no-store' });
        if (proxyRes.ok) return proxyUrl;
      } catch {
        /* silent */
      }
      return null;
    }

    const data = await res.json();
    if (typeof data?.image === 'string') return data.image;
    if (typeof data?.imageProxy === 'string') {
      try {
        const proxyRes = await fetch(data.imageProxy, { cache: 'no-store' });
        if (proxyRes.ok) return data.imageProxy;
      } catch {
        return data.imageProxy;
      }
    }
    return null;
  } catch {
    try {
      const proxyUrl = `/api/image/${fid}`;
      const proxyRes = await fetch(proxyUrl, { cache: 'no-store' });
      if (proxyRes.ok) return proxyUrl;
    } catch {
      /* silent */
    }
    return null;
  }
}

const maybePromptMiniAppInstallForXray = async () => {
  try {
    const actions = sdk.actions as any;
    if (typeof actions?.addMiniApp !== 'function') return;

    if (typeof actions?.isMiniAppAdded === 'function') {
      const isAdded = await actions.isMiniAppAdded();
      if (isAdded) return;
    }

    await actions.addMiniApp();
    setMiniAppAdded(true);
  } catch (error) {
    // Product strategy: never block the scan if user dismisses the install modal.
    console.log('User dismissed mini app install modal', error);
  }
};

const handleAction = async (e: React.MouseEvent) => {
e.preventDefault(); setErrorMessage(null);
const effectiveFid = subjectFid;
if (!resultImage) {
if (!effectiveFid) return setErrorMessage('FID not detected.');
await maybePromptMiniAppInstallForXray();
console.log('[xray] starting generation for fid:', effectiveFid, 'pfp:', subjectPfp?.slice(0, 60));
setLoading(true); setLoadingMessage('SCANNING CHAIN...');
try {
// Regra de produto: 1 NFT por FID para sempre, independente de ownership atual.
// Portanto, consulta por FID sem filtrar owner.
const existingImage = await fetchExistingNftImage(effectiveFid);
if (existingImage) {
console.log('[xray] already minted, image found:', existingImage.slice(0, 60));
setResultImage(existingImage);
const resolvedExisting = resolveIpfsUrl(existingImage);
setShareImageUrl(resolvedExisting);
shareImageUrlRef.current = resolvedExisting;
setAlreadyMinted(true); setHasMintedNft(true); setLoading(false); return;
}
setLoadingMessage('SEQUENCING...');
console.log('[xray] calling worker...');
if (!subjectPfp) throw new Error('Profile picture not loaded yet. Please wait a moment and try again.');
const response = isMiniAppRuntime
  ? await sdk.quickAuth.fetch('/api/xray/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pfpUrl: subjectPfp }),
    })
  : await fetch('/api/xray/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pfpUrl: subjectPfp }),
    });
const data = await response.json();
console.log('[xray] worker response ok:', response.ok, 'has image:', !!data.imageDataUrl, 'error:', data.error);
if (data.imageDataUrl) { setResultImage(data.imageDataUrl); }
else throw new Error(data?.error || 'No image returned.');
} catch (err) {
console.error('[xray] generation failed:', err);
setErrorMessage(getErrorMessage(err));
}
finally { setLoading(false); }
return;
}
if (!isMiniAppRuntime) return setErrorMessage('Mint requires Farcaster runtime.');
try {
if (chainId !== 8453) await switchChainAsync({ chainId: 8453 });
if (!address || !effectiveFid) throw new Error('Missing data to mint.');
setLoading(true); setLoadingMessage('COMPRESSING DNA...');
const lightImage = await compressImage(resultImage);
console.log('[mint] compressed image size:', Math.round(lightImage.length / 1024), 'KB');
const xrayMetadata = {
  fid: effectiveFid,
  generatedAt: new Date().toISOString(),
};
setLoadingMessage('PREPARING MINT...');
const prepResponse = await sdk.quickAuth.fetch(`/api/mint/prepare/${effectiveFid}`, {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ minter: address, imageDataUrl: lightImage, metadata: xrayMetadata }),
});
const prepData = await prepResponse.json();
console.log('[mint] prepare status:', prepResponse.status, 'data keys:', Object.keys(prepData));
if (prepResponse.status === 409) {
  const existingOnConflict = await fetchExistingNftImage(effectiveFid);
  if (existingOnConflict) {
    setResultImage(existingOnConflict);
    const resolvedExisting = resolveIpfsUrl(existingOnConflict);
    setShareImageUrl(resolvedExisting);
    shareImageUrlRef.current = resolvedExisting;
  }
  setAlreadyMinted(true);
  setLoading(false);
  return;
}
if (!prepResponse.ok) throw new Error(prepData?.error || 'Prepare error.');
if (!prepData.signature) throw new Error('No signature returned from prepare.');
if (!prepData.imageIpfsUrl) throw new Error('No IPFS URL returned from prepare.');
const imageIpfsUrl   = prepData.imageIpfsUrl as string;
      const publicImageUrl = prepData.image?.https ? prepData.image.https : resolveIpfsUrl(imageIpfsUrl);
setShareImageUrl(publicImageUrl);
shareImageUrlRef.current = publicImageUrl;
const signature    = prepData.signature    as `0x${string}`;
const mintPriceWei = BigInt(prepData.mintPriceWei || '0');
console.log('[mint] signature:', signature?.slice(0, 20), '... mintPrice:', mintPriceWei.toString());
setLoadingMessage('AWAITING WALLET...');
const safeFid = Number(effectiveFid);
if (!Number.isFinite(safeFid) || safeFid <= 0) throw new Error('Invalid FID for mint.');
await withMintTimeout(writeContractAsync({
  abi: frontendAbi,
  address: CONTRACT_ADDRESS as `0x${string}`,
  functionName: 'mintXRay',
  args: [BigInt(safeFid), imageIpfsUrl, signature],
  value: mintPriceWei,
  ...(BUILDER_CODE ? { dataSuffix: BUILDER_CODE } : {}),
}));
setHasMintedNft(true);
syncLeaderboard(getPoints(effectiveFid), true);
} catch (e) { setErrorMessage(classifyMintError(e)); }
finally { setLoading(false); setLoadingMessage('SEQUENCING...'); }
};

if (!isLoaded) return (
<div className="min-h-screen flex items-center justify-center font-mono" style={{ backgroundColor: T.bg, color: T.cyan, fontSize: 10 }}>
INITIALIZING...
</div>
);

if (isLanding) {
return (
<>
<style dangerouslySetInnerHTML={{ __html: `@keyframes landing-scan { 0%{top:0%;}100%{top:100%;} } .animate-landing-scan { animation: landing-scan 5s linear infinite; }`}} />
<LandingPage mintCount={mintCount} onEnterApp={handleEnterApp} />
</>
);
}

return (
<div className="min-h-screen text-white font-sans overflow-x-hidden relative"
style={{ backgroundColor: T.bg, backgroundImage: 'url(/fundo1.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>

  <div className="absolute inset-0 pointer-events-none" style={{
    zIndex: 0,
    backgroundColor: hasHeavyBgShadow ? 'rgba(14,17,23,0.90)' : 'rgba(14,17,23,0.72)',
  }} />

  <style dangerouslySetInnerHTML={{ __html: `
    ::-webkit-scrollbar { display: none; }
    @keyframes scan-line { 0%{top:0%;opacity:0;}10%{opacity:1;}100%{top:100%;opacity:0;} }
    @keyframes marquee   { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
    .animate-scan-line { animation: scan-line 3s linear infinite; }
    .animate-marquee   { display:flex; animation: marquee 25s linear infinite; width: max-content; }
  `}} />

  {showNotifModal && (
    <NotificationModal hasMinted={hasMintedNft} loading={notifLoading} success={notifSuccess}
      onAdd={handleAddMiniApp} onDismiss={handleDismissNotif} />
  )}
  {showWelcomeModal && (
    <WelcomeModal
      onClose={() => setShowWelcomeModal(false)}
      onAddMiniApp={handleAddMiniApp}
      onEnableNotifications={handleEnableNotifications}
      canAdd={!miniAppAdded}
      canEnableNotifications={!notificationsEnabled}
      loading={notifLoading}
    />
  )}

  <div className="relative z-10 flex flex-col items-center p-4 w-full max-w-[430px] mx-auto min-h-screen"
    style={{ paddingBottom: '110px' }}>

    {topTabTitle && (
      <div className="w-full mt-2 mb-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight tracking-tighter uppercase"
          style={{
            background: `linear-gradient(180deg, ${T.text1} 20%, ${T.muted} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: activeTab === 'stake' || activeTab === 'profile' ? FONT_DISPLAY : undefined,
          }}>
          {topTabTitle}
        </h1>
      </div>
    )}

    {/* ── X-RAY TAB ────────────────────────────────────────────────────── */}
    {activeTab === 'xray' && (
      <>
        {/* Header */}
        <header className="w-full flex items-center justify-between mb-2 mt-0">
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-extrabold tracking-tight tracking-tighter uppercase"
              style={{ background: `linear-gradient(180deg, ${T.text1} 20%, ${T.muted} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              X-RAY
            </h1>
          </div>

          <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl border"
            style={{ ...GLASS_HIGHLIGHT_STYLE, borderColor: 'rgba(76,214,255,0.20)' }}>
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border"
              style={{ ...GLASS_INNER_STYLE }}>
              {subjectPfp && <NextImage src={subjectPfp} alt="Profile" fill className="object-cover" unoptimized />}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 8 }}>@{username || 'user'}</span>
              <span className="font-bold" style={{ color: T.text1, fontSize: 10 }}>#{subjectFid || '—'}</span>
            </div>
          </div>
        </header>

        {/* NFT Scanner */}
        <ScanDNA
          pfpUrl={subjectPfp}
          loading={loading}
          resultImage={resultImage}
          loadingMessage={loadingMessage}
          showOnChainBadge={isMintSuccess || alreadyMinted}
        />


        {/* Mint counter */}
        <div className="w-full mt-5 mb-4 p-4 rounded-[2rem] border"
          style={{ ...GLASS_HIGHLIGHT_STYLE, borderColor: 'rgba(76,214,255,0.28)' }}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="font-mono italic uppercase" style={{ color: T.muted, fontSize: 9 }}>Mint Counter</span>
              {mintDisplay.displayCount === null ? (
                <span className="block text-lg font-bold font-mono italic animate-pulse" style={{ color: T.muted }}>
                  ···<span style={{ color: '#ffffff20' }}> / {mintDisplay.displayTotal}</span>
                </span>
              ) : (
                <span className="block text-lg font-bold font-mono italic" style={{ color: T.text1 }}>
                  {mintDisplay.displayCount}
                  <span style={{ color: T.muted }}> / {mintDisplay.displayTotal}</span>
                </span>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="font-mono px-2 py-1 rounded-md border italic font-bold"
                style={{ backgroundColor: `${mintDisplay.badgeColor}14`, borderColor: `${mintDisplay.badgeColor}33`, color: mintDisplay.badgeColor, fontSize: 10 }}>
                {mintDisplay.badgeLabel}
              </div>
              <div className="flex items-center gap-1 font-mono px-2 py-1 rounded-md border italic"
                style={{ backgroundColor: `${T.cyan}0a`, borderColor: `${T.cyan}22`, color: T.cyan, fontSize: 10 }}>
                <Zap className="w-3 h-3 fill-current" /> LIVE
              </div>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#ffffff08' }}>
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(mintDisplay.progressPct, 100)}%`, backgroundColor: mintDisplay.badgeColor }} />
          </div>
          <div className="mt-2 text-center">
            <span className="font-mono italic uppercase font-black" style={{ color: mintDisplay.badgeColor, fontSize: 9, letterSpacing: '0.2em' }}>
              ✦ MINT NOW — {mintDisplay.priceLabel} ✦
            </span>
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="w-full mb-4 p-4 rounded-2xl border text-center"
            style={{ ...GLASS_PANEL_STYLE, borderColor: `${T.error}44` }}>
            <span className="block font-mono font-extrabold tracking-tight uppercase" style={{ color: T.error, fontSize: 10 }}>⚠ SYSTEM_ERROR</span>
            <span className="font-mono italic uppercase" style={{ color: T.text2, fontSize: 11 }}>{errorMessage}</span>
          </div>
        )}

        {/* MUDANÇA #1 e #2: CTA buttons com nova hierarquia e Share label */}
        <div className="w-full space-y-3">
          {(isMintSuccess || alreadyMinted) ? (
            <div className="w-full flex flex-col gap-3">
              <button onClick={handleShareNft}
                className="w-full py-4 rounded-[1.4rem] font-extrabold tracking-tight uppercase text-lg transition-all active:scale-[0.98] hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ backgroundColor: T.cyan, color: T.bg, boxShadow: `0 0 40px ${T.cyan}33`, fontFamily: FONT_UI }}>
                <Share2 className="w-4 h-4" /> Share My X-Ray
              </button>
              <OpenSeaButton compact />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3">
              <button onClick={handleAction} disabled={loading || isConfirming}
                className="w-full py-4 rounded-[1.4rem] font-extrabold tracking-tight uppercase text-lg transition-all active:scale-[0.98]"
                style={resultImage && isConnected
                  ? { backgroundColor: T.cyan, color: T.bg, boxShadow: `0 0 30px ${T.cyan}33` }
                  : { ...GLASS_PANEL_STYLE, color: T.text1, borderColor: 'rgba(255,255,255,0.26)' }
                }>
                {loading ? 'PROCESSING...' : !resultImage ? 'RUN X-RAY' : isConfirming ? 'MINTING...' : 'MINT NFT'}
              </button>
              <OpenSeaButton compact />
            </div>
          )}
        </div>

        {/* NFT Marquee */}
        <div className="w-full overflow-hidden mt-7 mb-4">
          <div className="flex animate-marquee gap-4 px-4">
            {[...collection, ...collection].map((src, i) => (
              <div key={i} className="relative w-32 h-40 flex-shrink-0 rounded-2xl border overflow-hidden"
                style={{ ...GLASS_PANEL_STYLE }}>
                <NextImage src={src} alt="DNA" fill className="object-cover opacity-60" unoptimized />
              </div>
            ))}
          </div>
        </div>
        <footer className="mt-4 text-center">
          <div className="px-4 py-1.5 rounded-full border inline-flex items-center gap-2"
            style={{ backgroundColor: `${T.cyan}0a`, borderColor: `${T.cyan}22` }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: T.cyan }} />
            <span className="font-extrabold tracking-tight uppercase" style={{ color: T.cyan, fontSize: 9, letterSpacing: '0.2em' }}>
              USELESSBOY - FARCASTER / BASE
            </span>
          </div>
        </footer>
      </>
    )}

    {activeTab === 'rewards'      && <RewardsTab fid={subjectFid} hasMintedNft={hasMintedNft} username={username} pfpUrl={subjectPfp} isMiniAppRuntime={isMiniAppRuntime} isMobileRuntime={isMobileRuntime} contextWallets={contextVerifiedWallets} onPointsChanged={syncLeaderboard} />}
    {activeTab === 'stake'        && <StakeTab fid={subjectFid} />}
    {activeTab === 'leaderboard' && <LeaderboardTab fid={subjectFid} username={username} />}
    {activeTab === 'profile'      && <ProfileTab fid={subjectFid} pfp={subjectPfp} username={username} address={address} followers={profileFollowers} rank={liveRank} contextWallets={contextVerifiedWallets} />}
  </div>

  {/* ── BOTTOM NAV ──────────────────────────────────────────────────────── */}
  <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
    <div className="w-full max-w-[430px] flex items-center justify-around px-1 py-2 rounded-[2rem]"
      style={{
        backgroundColor: 'rgba(20,25,32,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(60,242,255,0.06)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
      {TABS.map(tab => (
        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
          className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-[1.5rem] transition-all"
          style={{
            backgroundColor: activeTab === tab.id ? `${T.cyan}18` : 'transparent',
            boxShadow: activeTab === tab.id ? `0 0 14px ${T.cyan}22` : 'none',
          }}>
          <span className="text-base leading-none">{tab.icon}</span>
          <span className="font-mono italic uppercase font-black"
            style={{ color: activeTab === tab.id ? T.cyan : T.muted, fontSize: 8 }}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  </div>

  {/* ── INFO MODAL ──────────────────────────────────────────────────────── */}
  {showInfo && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 backdrop-blur-md" style={{ backgroundColor: 'rgba(14,17,23,0.96)' }} onClick={() => setShowInfo(false)} />
      <div className="relative w-full max-w-[360px] rounded-[2.5rem] border p-8 shadow-2xl"
        style={{ backgroundColor: T.cardAlt, borderColor: '#ffffff10' }}>
        <h2 className="text-2xl font-extrabold tracking-tight uppercase mb-4" style={{ color: T.text1 }}>X-RAY Protocol</h2>
        <p className="font-mono italic uppercase leading-relaxed" style={{ color: T.muted, fontSize: 11 }}>
          Farcaster identity decoder. Only 2,333 units on Base.
        </p>
        <div className="mt-4 p-3 rounded-xl border font-mono italic uppercase leading-relaxed"
          style={{ backgroundColor: `${T.cyan}08`, borderColor: `${T.cyan}22`, color: T.cyan, fontSize: 10 }}>
          🟢 First {FREE_MINT_REAL_LIMIT * FREE_MINT_DISPLAY_MULTIPLIER} mints are FREE<br />
          💰 Remaining {PAID_DISPLAY_TOTAL} → 0.002 ETH each<br />
          ☠️ X-RAY Unique Protocol DNA
        </div>
        <button onClick={() => setShowInfo(false)}
          className="w-full mt-8 py-4 rounded-2xl font-extrabold tracking-tight uppercase"
          style={{ backgroundColor: T.cyan, color: T.bg, fontSize: 12 }}>
          End Transmission
        </button>
      </div>
    </div>
  )}
</div>

);
}
