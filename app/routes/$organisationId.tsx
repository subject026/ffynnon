import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import {
  Outlet,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import MainLayout from "../components/MainLayout/MainLayout";
import { getOrganisationById } from "../controllers/Organisation";
import { useEffect } from "react";
import type { TUserPayload } from "../controllers/UserController";

export async function loader({ params }: DataFunctionArgs) {
  const organisationId = params.organisationId as string;

  let organisation = await getOrganisationById(organisationId);

  if (!organisation) {
    return json({
      organisation: null,
    });
  }

  return json({
    organisation,
  });
}

export type TOrgSlugLoaderData = ReturnType<
  typeof useLoaderData<typeof loader>
>;

export default function OrgSlug() {
  const fetcher = useFetcher();

  const { organisation } = useLoaderData<typeof loader>();

  const { user } = useOutletContext<{ user: TUserPayload | null }>();

  <fetcher.Form />;

  useEffect(() => {
    if (!user) return;
    if (fetcher.type === "init" && organisation) {
      console.log("submitting...");

      fetcher.submit(
        { organisationId: organisation.id },
        { method: "post", action: "/api/set-session-org-id" }
      );
    }
  }, [user, fetcher, organisation]);

  return (
    <MainLayout user={user}>
      <Outlet context={{ organisation }} />
    </MainLayout>
  );
}
