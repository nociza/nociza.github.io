import { useRef } from "react";

/** Native wheel, touch, and keyboard scrolling; explicit arrows remain available. */
export function useScrollSnap() {
  return useRef<HTMLDivElement>(null);
}
