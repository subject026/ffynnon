import type { ReactNode } from "react";
import { classNames, pagewrap } from "../../utils";

export function Header({ children }: { children: ReactNode }) {
  return (
    <header>
      <div className={classNames(pagewrap)}>{children}</div>
    </header>
  );
}
