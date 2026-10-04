import {
  Bell,
  CalendarClock,
  ChartColumn,
  Check,
  Database,
  House,
  LayoutDashboard,
  Package,
  Puzzle,
  Rocket,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import { useId, type ReactNode } from "react";
import type { ProjectVisualKind } from "@/lib/projects";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/*
 * Illustrated placeholder visuals for projects without screenshots.
 * Pure SVG (viewBox 640×400, "slice" fit) so they stay crisp at any size and
 * follow the theme through token classes. Decorative only (aria-hidden).
 *
 * TODO(screenshots): once real screenshots exist in /public/images/projects/<slug>/,
 * set `cover` in src/lib/projects.ts — ProjectVisual then renders the image instead.
 */

type Props = {
  kind: ProjectVisualKind;
  cover?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProjectVisual({ kind, cover, alt = "", className, priority, sizes }: Props) {
  if (cover) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", className)}>
        <Image src={asset(cover)} alt={alt} fill priority={priority} sizes={sizes ?? "100vw"} className="object-cover" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" dir="ltr" className={cn("relative overflow-hidden bg-surface-2", className)}>
      {kind === "platform" ? <PlatformMock /> : null}
      {kind === "inventory" ? <InventoryMock /> : null}
      {kind === "mobile" ? <MobileMock /> : null}
      {kind === "web" ? <WebMock /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function useIds() {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return {
    glowA: `${raw}-ga`,
    glowB: `${raw}-gb`,
    grid: `${raw}-grid`,
    accent: `${raw}-acc`,
    area: `${raw}-area`,
    shadow: `${raw}-sh`,
  };
}

type Ids = ReturnType<typeof useIds>;

function Canvas({ ids, children }: { ids: Ids; children: ReactNode }) {
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <defs>
        <radialGradient id={ids.glowA} cx="0.1" cy="0" r="0.75">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.28" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={ids.glowB} cx="0.95" cy="1" r="0.7">
          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.accent} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id={ids.area} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <pattern id={ids.grid} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" className="stroke-fg/[0.06]" strokeWidth="1" />
        </pattern>
        <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#020817" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect width="640" height="400" fill={`url(#${ids.grid})`} />
      <rect width="640" height="400" fill={`url(#${ids.glowA})`} />
      <rect width="640" height="400" fill={`url(#${ids.glowB})`} />
      {children}
    </svg>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  r = 12,
  ids,
  accent,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  ids: Ids;
  accent?: boolean;
  className?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      filter={`url(#${ids.shadow})`}
      className={cn("fill-surface", accent ? "stroke-accent/60" : "stroke-line-strong", className)}
      strokeWidth="1"
    />
  );
}

function Bar({
  x,
  y,
  w,
  h = 6,
  tone = "muted",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tone?: "strong" | "muted" | "faint" | "accent" | "blue" | "violet" | "emerald" | "amber";
}) {
  const tones = {
    strong: "fill-fg/55",
    muted: "fill-fg/20",
    faint: "fill-fg/[0.08]",
    accent: "fill-accent/80",
    blue: "fill-accent-2/80",
    violet: "fill-violet-400/80",
    emerald: "fill-emerald-400/80",
    amber: "fill-amber-400/80",
  };
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={tones[tone]} />;
}

function WindowChrome({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <circle cx={x + 16} cy={y + 14} r="4" fill="#ff5f57" />
      <circle cx={x + 28} cy={y + 14} r="4" fill="#febc2e" />
      <circle cx={x + 40} cy={y + 14} r="4" fill="#28c840" />
      <rect x={x + 64} y={y + 8} width={Math.min(160, w * 0.36)} height="12" rx="6" className="fill-fg/[0.07]" />
      <line x1={x} x2={x + w} y1={y + 28} y2={y + 28} className="stroke-line" />
    </g>
  );
}

function IconTile({
  x,
  y,
  size = 24,
  ids,
  children,
  solid,
}: {
  x: number;
  y: number;
  size?: number;
  ids: Ids;
  children: ReactNode;
  solid?: boolean;
}) {
  const icon = size * 0.55;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={size * 0.3}
        fill={solid ? `url(#${ids.accent})` : undefined}
        className={solid ? undefined : "fill-accent/15 stroke-accent/30"}
      />
      <svg
        x={x + (size - icon) / 2}
        y={y + (size - icon) / 2}
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        className={solid ? "text-[#03121f]" : "text-accent-ink"}
        overflow="visible"
      >
        {children}
      </svg>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Omnichannel platform: web board + phone + extension + AI assistant */
/* ------------------------------------------------------------------ */

function KanbanCard({
  x,
  y,
  tag,
  ids,
  highlight,
  done,
}: {
  x: number;
  y: number;
  tag: "accent" | "blue" | "violet" | "emerald" | "amber";
  ids: Ids;
  highlight?: boolean;
  done?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="96"
        height="50"
        rx="8"
        className={cn("fill-surface", highlight ? "stroke-accent/70" : "stroke-line")}
        strokeWidth={highlight ? 1.5 : 1}
      />
      <Bar x={x + 8} y={y + 9} w={26} h={5} tone={tag} />
      {highlight ? (
        <IconTile x={x + 74} y={y + 6} size={14} ids={ids} solid>
          <Sparkles width={24} height={24} />
        </IconTile>
      ) : null}
      {done ? (
        <IconTile x={x + 74} y={y + 6} size={14} ids={ids}>
          <Check width={24} height={24} />
        </IconTile>
      ) : null}
      <Bar x={x + 8} y={y + 21} w={70} h={5} tone="strong" />
      <Bar x={x + 8} y={y + 31} w={50} h={4} tone="muted" />
      <circle cx={x + 14} cy={y + 42} r="4" className="fill-accent-2/50" />
      <rect x={x + 24} y={y + 40} width="64" height="4" rx="2" className="fill-fg/10" />
      <rect x={x + 24} y={y + 40} width={done ? 64 : highlight ? 40 : 22} height="4" rx="2" className="fill-accent/70" />
    </g>
  );
}

function PlatformMock() {
  const ids = useIds();
  return (
    <Canvas ids={ids}>
      {/* Web app window */}
      <Panel x={36} y={44} w={448} h={304} r={14} ids={ids} />
      <WindowChrome x={36} y={44} w={448} />
      {/* sidebar */}
      <line x1="92" x2="92" y1="72" y2="348" className="stroke-line" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="52"
          y={88 + i * 32}
          width="24"
          height="24"
          rx="7"
          className={i === 0 ? "fill-accent/20 stroke-accent/50" : "fill-fg/[0.06]"}
        />
      ))}
      {/* header */}
      <Bar x={108} y={90} w={120} h={9} tone="strong" />
      <Bar x={108} y={106} w={78} h={5} tone="muted" />
      <rect x="404" y="86" width="64" height="22" rx="11" fill={`url(#${ids.accent})`} />
      <Bar x={418} y={94} w={36} h={5} tone="faint" />
      {/* kanban columns */}
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={108 + c * 122} y="126" width="112" height="210" rx="10" className="fill-fg/[0.035]" />
          <circle cx={120 + c * 122} cy="140" r="3.5" className={["fill-amber-400", "fill-accent", "fill-emerald-400"][c]} />
          <Bar x={130 + c * 122} y={137} w={44} h={5} tone="muted" />
        </g>
      ))}
      <KanbanCard x={116} y={154} tag="violet" ids={ids} />
      <KanbanCard x={116} y={212} tag="amber" ids={ids} />
      <KanbanCard x={116} y={270} tag="blue" ids={ids} />
      <KanbanCard x={238} y={154} tag="accent" ids={ids} highlight />
      <KanbanCard x={238} y={212} tag="blue" ids={ids} />
      <KanbanCard x={360} y={154} tag="emerald" ids={ids} done />
      <KanbanCard x={360} y={212} tag="violet" ids={ids} done />

      {/* Browser extension popup */}
      <Panel x={392} y={20} w={150} h={76} ids={ids} />
      <IconTile x={404} y={32} size={22} ids={ids}>
        <Puzzle width={24} height={24} />
      </IconTile>
      <Bar x={434} y={36} w={64} h={6} tone="strong" />
      <Bar x={434} y={47} w={44} h={4} tone="muted" />
      <rect x="404" y="64" width="126" height="20" rx="6" className="fill-fg/[0.05]" />
      <Bar x={412} y={71} w={70} h={5} tone="muted" />
      <rect x="506" y="68" width="18" height="12" rx="6" className="fill-accent/80" />
      <circle cx="518" cy="74" r="4" className="fill-surface" />

      {/* Delay prediction card */}
      <Panel x={16} y={292} w={138} h={84} ids={ids} />
      <IconTile x={28} y={304} size={20} ids={ids}>
        <TrendingUp width={24} height={24} />
      </IconTile>
      <Bar x={56} y={309} w={58} h={5} tone="strong" />
      <path d="M28 362 L50 352 L70 356 L92 340 L112 344 L140 326 L140 366 L28 366 Z" fill={`url(#${ids.area})`} />
      <path
        d="M28 362 L50 352 L70 356 L92 340 L112 344 L140 326"
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="140" cy="326" r="3.5" className="fill-accent" />

      {/* AI assistant */}
      <Panel x={276} y={262} w={210} h={112} r={14} ids={ids} accent />
      <IconTile x={290} y={276} size={26} ids={ids} solid>
        <Sparkles width={24} height={24} />
      </IconTile>
      <Bar x={324} y={280} w={90} h={6} tone="strong" />
      <Bar x={324} y={292} w={60} h={4} tone="muted" />
      <rect x="290" y="312" width="182" height="26" rx="8" className="fill-fg/[0.05]" />
      <Bar x={300} y={318} w={150} h={4} tone="muted" />
      <Bar x={300} y={328} w={104} h={4} tone="muted" />
      {/* CP-SAT schedule strip */}
      <svg x="290" y="347" width="14" height="14" viewBox="0 0 24 24" className="text-accent-ink" overflow="visible">
        <CalendarClock width={24} height={24} />
      </svg>
      <rect x="310" y="350" width="40" height="8" rx="4" className="fill-accent/80" />
      <rect x="354" y="350" width="26" height="8" rx="4" className="fill-accent-2/80" />
      <rect x="384" y="350" width="48" height="8" rx="4" className="fill-violet-400/70" />
      <rect x="436" y="350" width="36" height="8" rx="4" className="fill-emerald-400/70" />

      {/* Mobile app */}
      <g filter={`url(#${ids.shadow})`}>
        <rect x="500" y="110" width="124" height="252" rx="24" className="fill-surface stroke-line-strong" />
      </g>
      <rect x="507" y="117" width="110" height="238" rx="18" className="fill-bg" />
      <rect x="548" y="123" width="28" height="6" rx="3" className="fill-fg/15" />
      <Bar x={517} y={142} w={54} h={6} tone="strong" />
      <rect x="517" y="158" width="90" height="56" rx="10" fill={`url(#${ids.accent})`} opacity="0.9" />
      <Bar x={527} y={170} w={46} h={5} tone="faint" />
      <rect x="527" y="182" width="62" height="7" rx="3.5" fill="#03121f" opacity="0.55" />
      <rect x="527" y="196" width="40" height="5" rx="2.5" fill="#03121f" opacity="0.3" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle
            cx="525"
            cy={232 + i * 26}
            r="6"
            className={i < 2 ? "fill-accent/80" : "fill-none stroke-fg/30"}
            strokeWidth="1.5"
          />
          {i < 2 ? (
            <path
              d={`M522 ${232 + i * 26} l2 2 l4 -4`}
              fill="none"
              stroke="#03121f"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <Bar x={538} y={229 + i * 26} w={i % 2 ? 48 : 62} h={5} tone={i < 2 ? "muted" : "strong"} />
        </g>
      ))}
      <rect x="517" y="334" width="90" height="12" rx="6" className="fill-fg/[0.06]" />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* Inventory dashboard                                                */
/* ------------------------------------------------------------------ */

function InventoryMock() {
  const ids = useIds();
  const bars = [52, 74, 60, 96, 82, 118, 104, 132];
  const kpis = [Package, ShoppingCart, TrendingUp];
  return (
    <Canvas ids={ids}>
      <Panel x={48} y={36} w={544} h={328} r={14} ids={ids} />
      <WindowChrome x={48} y={36} w={544} />
      {/* sidebar */}
      <line x1="160" x2="160" y1="64" y2="364" className="stroke-line" />
      <rect x="64" y="80" width="80" height="22" rx="7" className="fill-fg/[0.06]" />
      {[LayoutDashboard, Package, ShoppingCart, ChartColumn, Settings].map((Icon, i) => (
        <g key={i}>
          <rect
            x="64"
            y={118 + i * 30}
            width="80"
            height="22"
            rx="7"
            className={i === 0 ? "fill-accent/15" : "fill-transparent"}
          />
          <svg
            x="71"
            y={123 + i * 30}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className={i === 0 ? "text-accent-ink" : "text-fg/40"}
            overflow="visible"
          >
            <Icon width={24} height={24} />
          </svg>
          <Bar x={90} y={127 + i * 30} w={i === 0 ? 44 : 36} h={4} tone={i === 0 ? "accent" : "muted"} />
        </g>
      ))}
      {/* header */}
      <Bar x={176} y={78} w={110} h={9} tone="strong" />
      <rect x="456" y="74" width="120" height="18" rx="9" className="fill-fg/[0.05]" />
      <svg x="463" y="78" width="10" height="10" viewBox="0 0 24 24" className="text-fg/40" overflow="visible">
        <Search width={24} height={24} />
      </svg>
      {/* KPI tiles */}
      {kpis.map((Icon, i) => (
        <g key={i}>
          <rect x={176 + i * 136} y="104" width="124" height="66" rx="10" className="fill-fg/[0.035] stroke-line" />
          <IconTile x={188 + i * 136} y={116} size={22} ids={ids}>
            <Icon width={24} height={24} />
          </IconTile>
          <Bar x={188 + i * 136} y={146} w={58} h={9} tone="strong" />
          <Bar x={188 + i * 136} y={160} w={40} h={4} tone="muted" />
          <rect x={256 + i * 136} y="118" width="32" height="14" rx="7" className="fill-emerald-400/15" />
          <Bar x={262 + i * 136} y={123} w={20} h={4} tone="emerald" />
        </g>
      ))}
      {/* bar chart */}
      <rect x="176" y="184" width="262" height="164" rx="10" className="fill-fg/[0.035] stroke-line" />
      <Bar x={190} y={198} w={80} h={6} tone="strong" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1="190" x2="424" y1={240 + i * 32} y2={240 + i * 32} className="stroke-fg/[0.06]" strokeDasharray="3 4" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={196 + i * 28} y={336 - h} width="16" height={h} rx="4" fill={`url(#${ids.accent})`} opacity={i === bars.length - 1 ? 1 : 0.55 + i * 0.05} />
      ))}
      {/* donut + legend */}
      <rect x="450" y="184" width="126" height="164" rx="10" className="fill-fg/[0.035] stroke-line" />
      <circle cx="513" cy="246" r="34" fill="none" className="stroke-fg/10" strokeWidth="12" />
      <circle cx="513" cy="246" r="34" fill="none" className="stroke-accent" strokeWidth="12" strokeDasharray="110 214" transform="rotate(-90 513 246)" strokeLinecap="round" />
      <circle cx="513" cy="246" r="34" fill="none" className="stroke-accent-2" strokeWidth="12" strokeDasharray="60 214" strokeDashoffset="-118" transform="rotate(-90 513 246)" strokeLinecap="round" />
      {["accent", "blue", "muted"].map((tone, i) => (
        <g key={tone}>
          <circle cx="468" cy={302 + i * 14} r="3.5" className={["fill-accent", "fill-accent-2", "fill-fg/20"][i]} />
          <Bar x={478} y={300 + i * 14} w={[60, 44, 52][i]} h={4} tone="muted" />
        </g>
      ))}
      {/* order processed toast */}
      <Panel x={452} y={330} w={170} h={56} ids={ids} accent />
      <circle cx="476" cy="358" r="11" className="fill-emerald-400/20" />
      <svg x="469" y="351" width="14" height="14" viewBox="0 0 24 24" className="text-emerald-500" overflow="visible">
        <Check width={24} height={24} />
      </svg>
      <Bar x={496} y={350} w={92} h={6} tone="strong" />
      <Bar x={496} y={362} w={60} h={4} tone="muted" />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* Cross-platform mobile apps                                         */
/* ------------------------------------------------------------------ */

function PhoneFrame({ x, y, rotate, ids, children }: { x: number; y: number; rotate: number; ids: Ids; children: ReactNode }) {
  return (
    <g transform={`rotate(${rotate} ${x + 75} ${y + 150})`}>
      <g filter={`url(#${ids.shadow})`}>
        <rect x={x} y={y} width="150" height="300" rx="28" className="fill-surface stroke-line-strong" />
      </g>
      <rect x={x + 7} y={y + 7} width="136" height="286" rx="22" className="fill-bg" />
      <rect x={x + 58} y={y + 14} width="34" height="7" rx="3.5" className="fill-fg/15" />
      {children}
    </g>
  );
}

function MobileMock() {
  const ids = useIds();
  return (
    <Canvas ids={ids}>
      <PhoneFrame x={170} y={52} rotate={-7} ids={ids}>
        <Bar x={184} y={84} w={60} h={7} tone="strong" />
        <circle cx="296" cy="87" r="8" className="fill-accent-2/40" />
        <rect x="184" y="104" width="122" height="70" rx="12" fill={`url(#${ids.accent})`} opacity="0.92" />
        <rect x="196" y="118" width="54" height="6" rx="3" fill="#03121f" opacity="0.35" />
        <rect x="196" y="132" width="78" height="9" rx="4.5" fill="#03121f" opacity="0.6" />
        <rect x="196" y="152" width="40" height="12" rx="6" fill="#03121f" opacity="0.25" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={184 + (i % 2) * 64} y={186 + Math.floor(i / 2) * 58} width="58" height="50" rx="10" className="fill-fg/[0.05] stroke-line" />
            <rect x={192 + (i % 2) * 64} y={194 + Math.floor(i / 2) * 58} width="16" height="16" rx="5" className="fill-accent/25" />
            <Bar x={192 + (i % 2) * 64} y={218 + Math.floor(i / 2) * 58} w={38} h={5} tone="muted" />
          </g>
        ))}
        <rect x="184" y="312" width="122" height="26" rx="13" className="fill-fg/[0.06]" />
        {[House, Search, Bell, User].map((Icon, i) => (
          <svg key={i} x={196 + i * 28} y="318" width="14" height="14" viewBox="0 0 24 24" className={i === 0 ? "text-accent-ink" : "text-fg/40"} overflow="visible">
            <Icon width={24} height={24} />
          </svg>
        ))}
      </PhoneFrame>

      <PhoneFrame x={322} y={64} rotate={6} ids={ids}>
        <Bar x={336} y={96} w={70} h={7} tone="strong" />
        <Bar x={336} y={110} w={46} h={4} tone="muted" />
        <rect x="336" y="126" width="122" height="78" rx="12" className="fill-fg/[0.05] stroke-line" />
        <path d="M346 190 L366 176 L384 182 L404 160 L424 166 L448 144" fill="none" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M346 190 L366 176 L384 182 L404 160 L424 166 L448 144 L448 196 L346 196 Z" fill={`url(#${ids.area})`} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx="348" cy={226 + i * 24} r="8" className={["fill-accent/40", "fill-accent-2/40", "fill-violet-400/40", "fill-emerald-400/40"][i]} />
            <Bar x={362} y={220 + i * 24} w={64 - i * 6} h={5} tone="strong" />
            <Bar x={362} y={229 + i * 24} w={40} h={4} tone="muted" />
          </g>
        ))}
        <rect x="336" y="320" width="122" height="24" rx="12" fill={`url(#${ids.accent})`} />
        <rect x="372" y="329" width="50" height="6" rx="3" fill="#03121f" opacity="0.45" />
      </PhoneFrame>

      {/* floating badges */}
      <Panel x={40} y={252} w={140} h={56} ids={ids} />
      <IconTile x={54} y={266} size={28} ids={ids} solid>
        <Smartphone width={24} height={24} />
      </IconTile>
      <Bar x={92} y={272} w={70} h={6} tone="strong" />
      <Bar x={92} y={285} w={48} h={4} tone="muted" />

      <Panel x={482} y={70} w={130} h={56} ids={ids} accent />
      <IconTile x={496} y={84} size={28} ids={ids}>
        <Rocket width={24} height={24} />
      </IconTile>
      <Bar x={534} y={90} w={60} h={6} tone="strong" />
      <Bar x={534} y={103} w={40} h={4} tone="emerald" />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* Full-stack web apps & APIs                                         */
/* ------------------------------------------------------------------ */

const codeLines: { indent: number; parts: { w: number; tone: "violet" | "accent" | "blue" | "emerald" | "muted" | "amber" | "strong" }[] }[] = [
  { indent: 0, parts: [{ w: 34, tone: "violet" }, { w: 56, tone: "accent" }, { w: 30, tone: "muted" }] },
  { indent: 0, parts: [] },
  { indent: 0, parts: [{ w: 28, tone: "violet" }, { w: 70, tone: "blue" }, { w: 12, tone: "muted" }] },
  { indent: 1, parts: [{ w: 42, tone: "violet" }, { w: 64, tone: "amber" }, { w: 24, tone: "muted" }] },
  { indent: 2, parts: [{ w: 36, tone: "accent" }, { w: 80, tone: "emerald" }] },
  { indent: 2, parts: [{ w: 52, tone: "accent" }, { w: 44, tone: "strong" }, { w: 20, tone: "muted" }] },
  { indent: 2, parts: [{ w: 30, tone: "violet" }, { w: 96, tone: "blue" }] },
  { indent: 1, parts: [{ w: 14, tone: "muted" }] },
  { indent: 0, parts: [] },
  { indent: 1, parts: [{ w: 42, tone: "violet" }, { w: 58, tone: "amber" }, { w: 24, tone: "muted" }] },
  { indent: 2, parts: [{ w: 46, tone: "accent" }, { w: 62, tone: "emerald" }] },
  { indent: 2, parts: [{ w: 34, tone: "violet" }, { w: 72, tone: "strong" }] },
  { indent: 1, parts: [{ w: 14, tone: "muted" }] },
  { indent: 0, parts: [{ w: 10, tone: "muted" }] },
];

function WebMock() {
  const ids = useIds();
  return (
    <Canvas ids={ids}>
      {/* connectors */}
      <path d="M392 120 C 430 120, 430 70, 468 70" fill="none" className="flow-line stroke-accent/60" strokeWidth="1.5" />
      <path d="M392 230 C 420 230, 420 250, 440 250" fill="none" className="flow-line stroke-accent/60" strokeWidth="1.5" />

      {/* code editor */}
      <Panel x={28} y={44} w={364} h={300} r={14} ids={ids} />
      <WindowChrome x={28} y={44} w={364} />
      <rect x="28" y="72" width="40" height="272" className="fill-fg/[0.03]" />
      {codeLines.map((line, i) => {
        let cursor = 80 + line.indent * 18;
        return (
          <g key={i}>
            <Bar x={40} y={88 + i * 17} w={14} h={4} tone="faint" />
            {line.parts.map((part, j) => {
              const el = <Bar key={j} x={cursor} y={87 + i * 17} w={part.w} h={6} tone={part.tone} />;
              cursor += part.w + 6;
              return el;
            })}
          </g>
        );
      })}
      <rect x="250" y="153" width="2" height="12" className="fill-accent" />

      {/* database card */}
      <Panel x={468} y={30} w={148} h={104} ids={ids} />
      <IconTile x={482} y={44} size={24} ids={ids}>
        <Database width={24} height={24} />
      </IconTile>
      <Bar x={514} y={50} w={64} h={6} tone="strong" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="482" y={80 + i * 16} width="120" height="12" rx="4" className={i === 0 ? "fill-accent/15" : "fill-fg/[0.04]"} />
          <Bar x={488} y={84 + i * 16} w={28} h={4} tone={i === 0 ? "accent" : "muted"} />
          <Bar x={524} y={84 + i * 16} w={44} h={4} tone="muted" />
        </g>
      ))}

      {/* API response card */}
      <Panel x={440} y={170} w={184} h={190} r={14} ids={ids} accent />
      <rect x="454" y="184" width="36" height="16" rx="5" className="fill-emerald-400/20" />
      <Bar x={461} y={189} w={22} h={6} tone="emerald" />
      <Bar x={498} y={189} w={90} h={6} tone="strong" />
      <line x1="440" x2="624" y1="212" y2="212" className="stroke-line" />
      {[
        [0, 10, "muted"],
        [1, 52, "accent"],
        [1, 70, "accent"],
        [2, 46, "blue"],
        [2, 60, "amber"],
        [1, 40, "accent"],
        [0, 10, "muted"],
      ].map(([indent, w, tone], i) => (
        <Bar key={i} x={456 + (indent as number) * 14} y={226 + i * 16} w={w as number} h={6} tone={tone as "muted"} />
      ))}
      <circle cx="458" cy="346" r="4" className="fill-emerald-400" />
      <Bar x={468} y={343} w={60} h={5} tone="muted" />

      {/* security badge */}
      <circle cx="392" cy="176" r="20" className="fill-surface stroke-accent/60" filter={`url(#${ids.shadow})`} />
      <svg x="381" y="165" width="22" height="22" viewBox="0 0 24 24" className="text-accent-ink" overflow="visible">
        <ShieldCheck width={24} height={24} />
      </svg>
    </Canvas>
  );
}
