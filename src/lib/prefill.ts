import type { Lead } from "./lead";

/**
 * Hands an estimate from the estimator to the quote form. Kept in module
 * state rather than a context — one producer, one consumer, no tree to thread
 * it through. Cleared once the form has read it so a later visit starts clean.
 */
type Prefill = Partial<Lead>;

let pending: Prefill | null = null;
const listeners = new Set<(p: Prefill) => void>();

export function setPrefill(values: Prefill) {
  pending = values;
  listeners.forEach((fn) => fn(values));
}

export function takePrefill(): Prefill | null {
  const p = pending;
  pending = null;
  return p;
}

export function onPrefill(fn: (p: Prefill) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
