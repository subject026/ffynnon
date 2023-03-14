import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { classNames } from "../../../../utils";
import { buttonbase } from "../Button/Button";

export default function ButtonLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return (
    <Link to={to} className={classNames(buttonbase, "no-underline ")}>
      {children}
    </Link>
  );
}
