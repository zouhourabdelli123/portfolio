import { CalendarClock, Database, Monitor, Network, Puzzle, Server, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NodeProps = {
  icon: ReactNode;
  title: string;
  detail: string;
  accent?: boolean;
  className?: string;
  children?: ReactNode;
};

function DiagramNode({ icon, title, detail, accent, className, children }: NodeProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-bg/70 p-4 backdrop-blur",
        accent
          ? "border-accent/40 shadow-[0_0_0_1px_rgb(34_211_238/0.08),0_12px_40px_-16px_var(--glow)]"
          : "border-line-strong",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
            accent
              ? "bg-[linear-gradient(135deg,#22d3ee,#3b82f6)] text-[#03121f]"
              : "bg-accent/10 text-accent-ink ring-1 ring-accent/25",
          )}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="font-display text-[0.95rem] font-semibold leading-tight text-fg">{title}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted">{detail}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function LayerLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-subtle">{children}</p>
  );
}

/** Branching connectors. Paths are symmetric so they read the same in LTR and RTL. */
function Connector({ from, to }: { from: number; to: number }) {
  const xs = (n: number) => Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * 100);
  const top = xs(from);
  const bottom = xs(to);
  const paths =
    from >= to
      ? top.map((x) => `M${x} 0 C${x} 24, 50 24, 50 48`)
      : bottom.map((x) => `M50 0 C50 24, ${x} 24, ${x} 48`);
  return (
    <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="block h-12 w-full" aria-hidden="true">
      {paths.map((d) => (
        <g key={d}>
          <path d={d} fill="none" className="stroke-line-strong" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={d} fill="none" className="flow-line stroke-accent" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}

function ResponsiveConnector({ mobile, desktop }: { mobile: [number, number]; desktop: [number, number] }) {
  return (
    <>
      <div className="md:hidden">
        <Connector from={mobile[0]} to={mobile[1]} />
      </div>
      <div className="hidden md:block">
        <Connector from={desktop[0]} to={desktop[1]} />
      </div>
    </>
  );
}

export async function ArchitectureDiagram() {
  const t = await getTranslations("caseStudy.diagram");
  const icon = "size-5";

  return (
    <figure className="card relative overflow-hidden p-5 sm:p-8">
      <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-60" />
      <figcaption className="sr-only">{t("title")}</figcaption>

      <div className="relative">
        <LayerLabel>{t("clients")}</LayerLabel>
        <div className="grid gap-3 md:grid-cols-3">
          <DiagramNode icon={<Monitor className={icon} aria-hidden="true" />} title={t("web")} detail={t("webTech")} />
          <DiagramNode icon={<Smartphone className={icon} aria-hidden="true" />} title={t("mobile")} detail={t("mobileTech")} />
          <DiagramNode icon={<Puzzle className={icon} aria-hidden="true" />} title={t("extension")} detail={t("extensionTech")} />
        </div>

        <ResponsiveConnector mobile={[1, 1]} desktop={[3, 1]} />

        <div className="mx-auto max-w-xl">
          <DiagramNode accent icon={<Network className={icon} aria-hidden="true" />} title={t("gateway")} detail={t("gatewayDetail")} />
        </div>

        <Connector from={1} to={1} />

        <div className="mx-auto max-w-2xl">
          <DiagramNode icon={<Server className={icon} aria-hidden="true" />} title={t("services")} detail={t("servicesDetail")}>
            <div aria-hidden="true" className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-2.5 py-2">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span className="h-1.5 flex-1 rounded-full bg-fg/15" />
                </div>
              ))}
            </div>
          </DiagramNode>
        </div>

        <ResponsiveConnector mobile={[1, 2]} desktop={[1, 4]} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <DiagramNode icon={<Database className={icon} aria-hidden="true" />} title={t("database")} detail={t("databaseDetail")} />
          <DiagramNode icon={<Sparkles className={icon} aria-hidden="true" />} title={t("gemini")} detail={t("geminiDetail")} />
          <DiagramNode icon={<TrendingUp className={icon} aria-hidden="true" />} title={t("ml")} detail={t("mlDetail")} />
          <DiagramNode icon={<CalendarClock className={icon} aria-hidden="true" />} title={t("cpsat")} detail={t("cpsatDetail")} />
        </div>
        <div className="mt-3">
          <LayerLabel>{t("data")}</LayerLabel>
        </div>
      </div>
    </figure>
  );
}
