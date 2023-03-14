export function classNames(...args: any[]): string {
  return args.filter(Boolean).join(" ");
}

export const pagewrap = "max-w-6xl mx-auto p-4 sm:p-6 lg:p-8";
