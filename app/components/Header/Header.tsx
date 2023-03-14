import type { ReactNode } from "react";
import { classNames, pagewrap } from "../../utils";

export function Header({ children }: { children: ReactNode }) {
  return (
    <header>
      <div
        className={classNames(
          pagewrap,
          "flex flex-row justify-between items-center"
        )}
      >
        {children}
      </div>
    </header>
  );
}
