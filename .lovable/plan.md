
## Problem 1 — "Polskiej Legendy Typerów" is invisible

In `src/components/sections/Hero.tsx` the gold gradient line is built as:

```text
<span class="bg-gradient... bg-clip-text text-transparent">
  <WordsReveal>
    <span overflow-hidden>
      <motion.span>Polskiej</motion.span>   ← actual text
    </span>
    ...
  </WordsReveal>
</span>
```

`bg-clip-text` only masks the background on the element that owns the text. The text actually lives on the inner `motion.span`, which has no background — it just inherits `color: transparent` from the parent. Result: the gradient renders on the outer empty wrapper, the inner text is transparent, nothing is visible.

### Fix
Add an optional `gradient` (boolean) prop to `WordsReveal`. When true, apply the gradient classes (`bg-gradient-to-b from-energy-yellow to-[#FFB800] bg-clip-text text-transparent`) directly on each inner `motion.span`. Drop those classes from the outer wrapper span (keep it only for positioning `GoldSweep`). The gold sweep stays unchanged.

This only touches the headline JSX and the `WordsReveal` helper inside `Hero.tsx`. No new files.

## Problem 2 — Hover on "Jak to działa" step cards is weak

Currently each step card in `src/components/sections/HowToStart.tsx` only does `hover:-translate-y-1` + a faint border color change. Feels flat.

### Fix — premium hover (still GPU-only: transform / opacity / box-shadow / filter)
On `group` hover for non-highlight cards:
- Border goes to `#FFD60A/45` (intensify, not just /25).
- Card gets a layered gold glow: `box-shadow: 0 12px 40px -10px rgba(255,214,10,0.35), inset 0 1px 0 rgba(255,214,10,0.15)`.
- Lift increases to `-translate-y-1.5` and `scale-[1.01]`.
- Background tint shifts subtly toward gold via an absolutely-positioned overlay div (`bg-gradient-to-br from-[#FFD60A]/8 to-transparent`, `opacity-0 group-hover:opacity-100`, 500ms).
- A diagonal gold sweep overlay (linear-gradient strip) translates across the card on hover (`-translate-x-full → translate-x-full`, 900ms, ease-out), masked by `overflow-hidden` (already set).
- Icon tile: `group-hover:scale-110`, brighter bg `#FFD60A/20`, stronger shadow `0 0 24px rgba(255,214,10,0.35)`; icon color goes to full `#FFD60A`.
- "0X" watermark: `group-hover:text-[rgba(255,214,10,0.18)]` (fade-in tint), 500ms.
- "Krok N" label: `group-hover:text-[#FFD60A]` (from /80 → full).
- Transitions unified: `transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`.

The highlight card (step 4) already pulses; its hover gets the same lift + sweep but keeps the pulsing border (no border color change).

Respect `prefers-reduced-motion`: wrap the sweep + scale in a `motion-safe:` variant so reduced-motion users only see border/shadow shifts.

## Files touched
- `src/components/sections/Hero.tsx` — extend `WordsReveal` with `gradient` prop, move gradient classes inside; clean outer wrapper.
- `src/components/sections/HowToStart.tsx` — richer hover treatment on the step cards (classes + one overlay div + one sweep div per card).

No new dependencies, no layout changes, no token changes.
