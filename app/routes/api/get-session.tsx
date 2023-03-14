import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";
import { getUserFromSession } from "../../resources/Auth/AuthController.server";
import { getSession } from "../../utils/session.server";

export async function loader({ request }: DataFunctionArgs) {
  // console.log("request in getSession.tsx: ", request);

  const cookie = request.headers.get("Cookie");

  const session = await getSession(cookie);

  const userId = session.get("userId");
  const organisationId = session.get("organisationId");

  console.log("userId in getSession.tsx: ", userId);
  console.log("organisationId in getSession.tsx: ", organisationId);

  const user = await getUserFromSession(request);

  console.log(user);

  return json({ user });
}
