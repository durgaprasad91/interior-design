/**
 * Resolves once the preloader has finished, so the hero animation plays to a
 * visible page instead of running behind the overlay.
 */
let done = false;
let resolve: (() => void) | undefined;

export const bootComplete = new Promise<void>((r) => {
  resolve = r;
});

export function finishBoot() {
  if (done) return;
  done = true;
  resolve?.();
}
