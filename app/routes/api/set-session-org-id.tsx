import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";
import { getUserFromSession } from "../../resources/Auth/AuthController.server";
import { setSessionOrganisationId } from "../../utils/session.server";
import { badRequest } from "../../utils/request.server";

export async function action({ request }: DataFunctionArgs) {
  const body = await request.formData();
  const organisationId = body.get("organisationId");

  const user = await getUserFromSession(request);
  if (!user) {
    return json({
      message: "no user logged in",
    });
  }

  if (!organisationId) {
    return badRequest({ message: "no organisation id provided" });
  }
  const cookie = await setSessionOrganisationId(
    request,
    organisationId as string
  );

  return json(
    { message: "session organisation id set" },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}
