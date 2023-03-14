import { redirect } from "@remix-run/node";

export const action = () => {
  return redirect("/");
};
