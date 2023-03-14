import type { EmailOtpType } from "@supabase/supabase-js";
import { createServerClient, supabase } from "./supabase.server";

type LoginForm = {
  email: string;
};

export async function login({ email }: LoginForm) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: "http://localhost:3000/verify" },
  });
  if (!data || error) {
    return null;
  }
  return data;
}

type VerifyParams = {
  email: string;
  token: string;
  supabase: ReturnType<typeof createServerClient>;
};

export async function verify({ supabase, token, email }: VerifyParams) {
  console.log("\n\n", "______--VERIFY_________");
  console.log("\n\n", "token: ", token);
  console.log("email: ", email, "\n\n");

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    type: "signup",
    token,
  });

  const userId = data.user?.id;
  if (error || !userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}
