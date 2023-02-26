import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import OrgLayout from "../components/OrgLayout/OrgLayout";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: DataFunctionArgs) {
  return json({ wooo: "is org" });
}

export default function OrgSlug() {
  const { wooo } = useLoaderData<typeof loader>();

  return (
    <OrgLayout>
      <h2>Hi I'm a Org</h2>
      <pre>{JSON.stringify(wooo, null, 2)}</pre>
    </OrgLayout>
  );
}
