import { createServerClient as _createServerClient } from "@supabase/auth-helpers-remix";

import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

// export const createServerClient = ({
//   request,
//   response,
// }: {
//   request: Request;
//   response: Response;
// }) =>
//   _createServerClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!,
//     { request, response }
//   );

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;

invariant(PUBLIC_SUPABASE_URL, "PUBLIC_SUPABASE_URL not set!");
invariant(PUBLIC_SUPABASE_ANON_KEY, "PUBLIC_SUPABASE_ANON_KEY not set!");

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

export const createServerClient = ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) =>
  _createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    request,
    response,
  });
