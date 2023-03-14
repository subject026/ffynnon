import MainLayout from "../components/MainLayout/MainLayout";
import ButtonLink from "../packages/shared/components/ButtonLink/ButtonLink";
import { classNames, pagewrap } from "../utils";

import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import { db } from "../utils/db.server";
import type { TUserPayload } from "../controllers/UserController";

export async function loader({ request }: DataFunctionArgs) {
  let organisations = await db.organisation.findMany();

  return json({
    organisations,
  });
}

export default function Index() {
  const { organisations } = useLoaderData<typeof loader>();

  const { user } = useOutletContext<{ user: TUserPayload | null }>();

  return (
    <MainLayout user={user}>
      <div
        className={classNames(
          pagewrap,
          "flex flex-col items-center justify-center prose"
        )}
      >
        {user ? (
          <LoggedIn
            user={{
              email: user.email,
              memberships: user.memberships.map((membership) => ({
                id: membership.id,
                organisation: {
                  id: membership.organisation.id,
                  name: membership.organisation.name,
                  slug: membership.organisation.slug,
                  profileImg: membership.organisation.profileImg,
                },
              })),
            }}
          />
        ) : (
          <>
            <NotLoggedIn />
            {organisations.length ? (
              <div>
                {organisations.map((organisation) => (
                  <div key={`${organisation.id}`}>{organisation.name}</div>
                ))}
              </div>
            ) : (
              <div>no orgs found!</div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

function LoggedIn({
  user,
}: {
  user: {
    email: string;
    memberships: {
      id: string;
      organisation: {
        id: string;
        name: string;
        slug: string | null;
        profileImg: string | null;
      };
    }[];
  };
}) {
  return (
    <>
      <p>logged in!</p>

      {user &&
        user.memberships.length &&
        user.memberships.map(({ organisation }) => {
          return (
            <p key={organisation.id}>
              <Link
                to={`/${
                  organisation.slug ? organisation.slug : organisation.id
                }`}
              >
                {organisation.profileImg && (
                  <img src={organisation.profileImg} alt="" />
                )}
                {organisation.name}
              </Link>
            </p>
          );
        })}
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
