import type { ReactNode } from "react";

import { Main, PageContainer } from "../../packages/shared/components/Layout";
import Footer from "../Footer/Footer";
import { Header } from "../Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <Header>Header Stuff</Header>
      <Main>{children}</Main>
      <Footer />
    </PageContainer>
  );
}
