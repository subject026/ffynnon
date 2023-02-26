import type { ReactNode } from "react";

import { classNames, pagewrap } from "../../utils";

export default function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="bg-neutral-200 text-neutral-700">
      <div className={classNames(pagewrap)}>footer</div>
    </footer>
  );
}
