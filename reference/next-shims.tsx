/**
 * The reference page is a plain Vite build, so Next's `Image` and `Link` are
 * aliased to these. They render exactly the element Next renders in the browser
 * — an `<img>` and an `<a>` — without the framework's routing and image
 * optimiser, which have nothing to do with what is being reviewed.
 */
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
};

export function Image({ priority: _priority, fill: _fill, quality: _quality, ...props }: ImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt} />;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

export function Link({ prefetch: _p, replace: _r, scroll: _s, ...props }: LinkProps) {
  return <a {...props} />;
}

export default Image;
