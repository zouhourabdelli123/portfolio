import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, intro, id, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent-ink">
          <span className="font-mono text-xs text-subtle">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
