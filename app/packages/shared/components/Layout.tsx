import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}

export function Main({ children }: { children: ReactNode }) {
  return <main className="grow">{children}</main>;
}
