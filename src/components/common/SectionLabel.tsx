import type { ReactNode } from "react";

export default function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="folio-label"><span>{number}</span>{children}</p>;
}
