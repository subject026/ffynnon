import { DataFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { createUserSession } from "~/utils/session.server";
import { verify } from "../utils/auth.server";
import { badRequest } from "../utils/request.server";
import { createServerClient, supabase } from "../utils/supabase.server";

function getUrlParams(url: string) {
  const urlObject = new URL(url);
  const email = urlObject.searchParams.get("access_token");
  const token = urlObject.searchParams.get("token");

  console.log({ urlObject });

  console.log("\n\n", urlObject.searchParams.get("type"));

  // ensure that type is present and a correct value
  const type: "signup" | "magiclink" | null = urlObject.searchParams.get(
    "type"
  ) as any;
  // tiny-invariant makes type narrowing easier
  invariant(type, "Invalid type");

  // ensure that email and token are present
  if (typeof email !== "string" || typeof token !== "string") {
    throw new Error("Bad params");
  }

  return { email, token, type };
}

export const loader: LoaderFunction = async ({ request }) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const { data, error } = await supabase.auth.getSession();
  console.log({ data, error });

  return json(
    {
      yeaa: "wooo",
    },
    {
      headers: response.headers,
    }
  );
  // try {
  //   // get magic link information from URL
  //   const { email, token, type } = getUrlParams(request.url);
  //   console.log({ email, token, type });

  //   // verify magic link
  //   const userId = await verify({ email, token, type });
  //   if (!userId) {
  //     throw new Error("Authentication failed");
  //   }

  //   // create session from resulting user ID
  //   return createUserSession(userId, "/profile");
  // } catch (e: any) {
  //   console.log(e);

  //   return json({ error: e });
  // }
};

export async function action({ request }: DataFunctionArgs) {
  // const urlObject = new URL(request.url);
  // const token = urlObject.searchParams.get("access_token");

  const response = new Response();
  const supabase = createServerClient({ request, response });

  const formData = await request.formData();

  const token = formData.get("access_token");

  if (typeof token !== "string") {
    return badRequest({ message: "no token!" });
  }
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const email = session?.user?.email;
  const data = await supabase.auth.getUser();
  console.log({ data });

  const email = data?.data.user?.email;

  if (!email) {
    return badRequest({ message: "no email" });
  }

  const userId = await verify({ request, response, token, email });

  if (!userId) {
    return badRequest({ message: "userId not found" });
  }

  return createUserSession(userId, "/");
}

export default function VerifyPage() {
  // const data = useLoaderData();
  // console.log({ data });

  const formRef = useRef<HTMLFormElement>(null);

  const location = useLocation();

  console.log("location.hash: ", location.hash.substring(1));

  const params = new URLSearchParams(location.hash.substring(1));

  const accessToken = params.get("access_token");
  console.log("\n\n", accessToken);

  const data = useActionData<typeof action>();

  console.log({ data });

  // useEffect(() => {
  //   if (formRef.current && !data) {
  //     formRef.current.submit();
  //   }
  // }, [formRef, data]);

  return (
    <div>
      <h1>Supabase Magic Link x Remix</h1>
      <p>Verifying, please wait...</p>
      {accessToken && (
        <Form method="post" ref={formRef}>
          <input name="access_token" type="hidden" defaultValue={accessToken} />
        </Form>
      )}
      {/* {data?.error && <pre>{JSON.stringify(data.error, null, 2)}</pre>} */}
    </div>
  );
}
