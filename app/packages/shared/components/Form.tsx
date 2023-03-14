import type { ChangeEvent, ReactNode, Ref } from "react";

import { Form as RemixForm } from "@remix-run/react";

export function FormTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-bold text-2xl text-neutral-700">{children}</h2>;
}

export function FormControl({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function Label({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {children}
    </label>
  );
}

export function EmailInput({
  name,
  onChange,
  value,
}: {
  name: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="email"
      name={name}
      value={value}
      id={name}
      placeholder="email"
      onChange={onChange}
      required
      className="border-solid border border-gray-400 rounded px-2 py-3"
    />
  );
}

export function Input({
  name,
  id,
  type,
  placeholder,
  required,
  onChange,
  value,
  defaultValue,
}: {
  name: string;
  id: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className="border-solid border border-gray-400 rounded px-2 py-3"
      onChange={onChange}
      required={required}
      value={value}
      defaultValue={defaultValue}
    />
  );
}

export function SubmitInput({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="px-6 py-4 bg-neutral-600 text-neutral-300 hover:text-neutral-200 hover:bg-neutral-700 font-bold focus:text-neutral-200 focus:bg-neutral-700"
    >
      {children}
    </button>
  );
}

export function Form({ children }: { children: ReactNode }) {
  return (
    <RemixForm method="post" className="flex flex-col gap-6">
      {children}
    </RemixForm>
  );
}
