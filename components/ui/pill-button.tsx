import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const TONE = {
  red: "bg-brand-red text-white",
  blue: "bg-brand-blue-bright text-white",
  gold: "bg-gradient-to-r from-brand-gold-from to-brand-gold-to text-black",
} as const;

/** The white circle holding a diagonal arrow, used on every Figma CTA.
    On hover the arrow nudges down 0.5px and grows by 0.3; the button's own
    fill layer (see PillButton) expands behind it. */
export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative z-10 grid size-[2em] shrink-0 place-items-center rounded-full bg-white text-black",
        className,
      )}
    >
      <Icon
        icon="iconamoon:arrow-top-right-1-light"
        className="pill-arrow size-[1.2em]"
        aria-hidden
      />
    </span>
  );
}

type Props = {
  href: string;
  tone?: keyof typeof TONE;
  arrow?: "left" | "right" | "none";
  className?: string;
  children: React.ReactNode;
};

/**
 * Pill CTA. A white disc sits where the arrow circle is; on hover it scales up
 * until it fills the whole button, which turns white with dark text.
 */
export function PillButton({ href, tone = "blue", arrow = "right", className, children }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "pill relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full py-2.5 text-lg font-medium",
        arrow === "none" ? "px-7" : arrow === "left" ? "pr-7 pl-2.5" : "pr-2.5 pl-7",
        TONE[tone],
        className,
      )}
    >
      {arrow !== "none" ? (
        <span
          aria-hidden
          className={cn(
            "pill-fill absolute top-1/2 -z-10 size-[2em] -translate-y-1/2 rounded-full bg-white",
            arrow === "left" ? "left-2.5" : "right-2.5",
          )}
        />
      ) : null}
      {arrow === "left" ? <ArrowCircle /> : null}
      <span className="relative">{children}</span>
      {arrow === "right" ? <ArrowCircle /> : null}
    </Link>
  );
}
