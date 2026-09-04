import { cn } from "@/lib/cn";

/**
 * Artwork square used by every player surface. Figma fills these with photography
 * from the Pictures section; in code the image is a prop and, until a story has
 * one, this paints the red-lit placeholder so the layout is honest about the slot.
 */
export type CoverProps = {
  src?: string;
  alt?: string;
  size?: number;
  radius?: number;
  className?: string;
};

export function Cover({ src, alt = "", size = 70, radius = 16, className }: CoverProps) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden bg-black", className)}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <span
          aria-hidden
          className="block size-full"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, #ff2a2a 0%, #8a0202 45%, #1a0303 100%), linear-gradient(160deg,#2a0505,#0d0202)",
          }}
        />
      )}
    </span>
  );
}
