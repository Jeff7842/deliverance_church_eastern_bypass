import { cn } from "@/lib/utils";

/** Side padding + max width. Every section's content sits in one of these. */
export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-(--gutter)", className)} {...props} />;
}

/** Standard vertical rhythm. Full-bleed 1024 panels (Hero, Welcome) skip it. */
export function Section({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-(--section-y)", className)} {...props} />;
}
