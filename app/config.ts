import invariant from "tiny-invariant";

function makeConfig() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  invariant(SUPABASE_URL, "SUPABASE_URL not defined!");
  invariant(SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY not defined!");

  return {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  };
}

export const config = makeConfig();
