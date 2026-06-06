import { cn } from "@/lib/utils";

type EmojiProps = {
  children: string;
  className?: string;
  size?: number | string;
  "aria-label"?: string;
};

/**
 * Renders an emoji using Apple's emoji style across all platforms,
 * via the public emojicdn.elk.sh CDN. Falls back to system emoji on error.
 */
export function Emoji({ children, className, size = "1em", "aria-label": ariaLabel }: EmojiProps) {
  const emoji = children?.toString() ?? "";
  const url = `https://emojicdn.elk.sh/${encodeURIComponent(emoji)}?style=apple`;
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <img
      src={url}
      alt={ariaLabel ?? emoji}
      draggable={false}
      loading="lazy"
      className={cn("inline-block align-[-0.15em] select-none", className)}
      style={{ width: dim, height: dim }}
      onError={(e) => {
        // Fallback: replace with plain text emoji if CDN fails
        const img = e.currentTarget;
        const span = document.createElement("span");
        span.textContent = emoji;
        span.className = img.className;
        img.replaceWith(span);
      }}
    />
  );
}

export default Emoji;
