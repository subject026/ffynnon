import { Form, Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { TUserPayload } from "../../controllers/UserController";
import type { TUser } from "../../models/User/User";
import Button from "../../packages/shared/components/Button/Button";

import { Main, PageContainer } from "../../packages/shared/components/Layout";
import Footer from "../Footer/Footer";
import { Header } from "../Header";
import Logo from "../Logo";

export default function MainLayout({
  children,
  user,
}: {
  children: ReactNode;
  user: TUserPayload | null;
}) {
  return (
    <PageContainer>
      <Header>
        <Link to="/">
          <Logo />
        </Link>
        {user && (
          <div>
            <Form action="/logout" method="post">
              <Button type="submit">logout</Button>
            </Form>
          </div>
        )}
      </Header>
      <Main>{children}</Main>
      <Footer />
    </PageContainer>
  );
}
