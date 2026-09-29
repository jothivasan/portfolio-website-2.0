const sectionIds = new Set(["about", "projects", "experience", "writing"]);

export function getSectionDestination(hash: string): string | null {
  const id = hash.slice(1);
  return sectionIds.has(id) ? id : null;
}

// Called only after the Suspense boundary has committed all portfolio sections.
export function settleSectionArrival(destination: string, reveal: () => void): () => void {
  let cancelled = false;
  let frame = 0;
  const position = () => {
    if (cancelled) return;
    frame = window.requestAnimationFrame(() => {
      if (cancelled) return;
      // Respect navigation performed while the destination was loading.
      const current = getSectionDestination(window.location.hash)
        ?? (window.location.hash === "#hero" ? "hero" : destination);
      const target = document.getElementById(current);
      target?.scrollIntoView({ behavior: "instant", block: "start" });
      reveal();
    });
  };
  if (document.fonts.status === "loaded") position();
  else void document.fonts.ready.then(position, position);
  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frame);
  };
}
