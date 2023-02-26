import MainLayout from "../components/MainLayout/MainLayout";
import ButtonLink from "../packages/shared/components/ButtonLink/ButtonLink";
import { classNames, pagewrap } from "../utils";

import type { loader as rootLoader } from "../root";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { DataFunctionArgs, json, SerializeFrom } from "@remix-run/node";
import { createServerClient } from "../utils/supabase.server";
import { User } from "@supabase/auth-helpers-remix";

export async function loader({ request }: DataFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return json({
      session: null,
    });
  }

  // const organisations =
  return json(
    {
      session,
      // organisations,
    },
    {
      headers: response.headers,
    }
  );
}

export default function Index() {
  const { session } = useLoaderData<typeof loader>();

  const user = session?.user;

  return (
    <MainLayout user={user as User}>
      <div
        className={classNames(
          pagewrap,
          "flex flex-col items-center justify-center prose"
        )}
      >
        {user ? <LoggedIn user={user as User} /> : <NotLoggedIn />}
      </div>
    </MainLayout>
  );
}

function LoggedIn({ user }: { user: User }) {
  return (
    <>
      <p>logged in!</p>
      <p>{user.email}</p>
    </>
  );
}

function NotLoggedIn() {
  return (
    <>
      <h1>Ffynnon Home Page</h1>
      <nav className="flex gap-4">
        <ButtonLink to={"/register"}>register</ButtonLink>
        <ButtonLink to={"/login"}>login</ButtonLink>
      </nav>
    </>
  );
}
