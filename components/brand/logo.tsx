import Image from "next/image";

/** Official church mark (public/brand/church-logo.png, 2160 x 1574, transparent). */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/church-logo.png"
      alt="Deliverance Church Eastern Bypass: The church of choice"
      width={2160}
      height={1574}
      priority={priority}
      sizes="(min-width: 1024px) 30rem, 70vw"
      className={className}
    />
  );
}
