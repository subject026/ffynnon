import type { ReactNode } from "react";
import { PageContainer } from "../../packages/shared/components/Layout";

import { classNames, pagewrap } from "../../utils";
import { Header } from "../Header";

export default function OrgLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <Header>Header</Header>
      <main className="grow">
        <div className={classNames(pagewrap)}>{children}</div>
      </main>
      <footer className="bg-neutral-200 text-neutral-700">
        <div className={classNames(pagewrap)}>footer</div>
      </footer>
    </PageContainer>
  );
}
