import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,box-shadow,color,border-color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(110deg,#22d3ee,#3b82f6)] text-on-accent shadow-[0_10px_30px_-10px_var(--glow)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_var(--glow)]",
  secondary:
    "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-accent/60 hover:bg-surface",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
