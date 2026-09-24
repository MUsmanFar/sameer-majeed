export const MQ = {
  desktop: "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
  tablet: "(min-width: 768px) and (max-width: 1199px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  finePointer: "(pointer: fine) and (min-width: 1200px) and (prefers-reduced-motion: no-preference)",
} as const;

export function pinConfig(end: string, scrub = 0.8) {
  return {
    start: "top top",
    end,
    pin: true,
    scrub,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  } as const;
}
