import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(value: Lenis | null) {
  instance = value;
}

export function getLenis() {
  return instance;
}
