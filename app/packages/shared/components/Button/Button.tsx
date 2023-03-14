import type { ReactNode } from "react";
import { classNames } from "../../../../utils";

export const buttonbase =
  "px-4 py-2 rounded bg-neutral-300 text-neutral-700 font-bold hover:text-neutral-800 focus:text-neutral-800 disabled:text-neutral-00 disabled:cursor-not-allowed";

export default function Button({
  children,
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}) {
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      className={classNames(buttonbase)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
