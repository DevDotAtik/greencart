import { cn } from "@/utils/cn";

type ProductVisualProps = {
  title: string;
  subtitle?: string;
  palette: string;
  className?: string;
};

export function ProductVisual({
  title,
  subtitle,
  palette,
  className,
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br p-6",
        palette,
        className,
      )}
    >
      <div className="absolute -right-8 top-4 h-28 w-28 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <span className="tag-pill w-fit bg-white/70 text-ink-700">Farm fresh</span>
        <div>
          <p className="font-serif text-2xl font-bold text-ink-900">{title}</p>
          {subtitle ? <p className="mt-2 text-sm text-ink-600">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}
