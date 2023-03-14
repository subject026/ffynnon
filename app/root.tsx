import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import stylesheet from "~/css/index.css";
import { TUserPayload } from "./controllers/UserController";
import { TUser } from "./models/User/User";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const fetcher = useFetcher();

  const [user, setUser] = useState<TUserPayload | null>(null);

  useEffect(() => {
    console.log("\n\n\n");
    console.log(user);
    console.log(fetcher.type);
    console.log("\n\n\n");
    if (!user && fetcher.type === "init") {
      console.log("pinging api to check for logged in user");

      fetcher.load("/api/get-session");
    }
  }, [fetcher, user]);

  useEffect(() => {
    if (fetcher.data) {
      setUser(fetcher.data.user);
    }
  }, [fetcher.data]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Outlet
          context={{
            // supabase,
            user,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
