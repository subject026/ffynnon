import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "../utils/session.server";
import { supabase } from "../utils/supabase.server";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  await logout(request);
  await supabase.auth.signOut();
  return redirect("/login", {
    headers: response.headers,
  });
};

export const loader = async () => {
  return redirect("/login");
};
