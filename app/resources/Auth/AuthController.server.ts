import bcrypt from "bcryptjs";

import { redirect } from "@remix-run/node";
import {
  commitSession,
  destroySession,
  getSession,
} from "~/utils/session.server";
import { getUserByEmail, getUserById } from "../../controllers/UserController";
import User from "../../models/User";
import { TUser } from "../../models/User/User";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  email: string;
  password: string;
};

export async function register({ email, password }: RegisterForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  return { id: user.id, email };
}

export async function login({ email, password }: LoginForm) {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) return null;

  return { id: user.id, email };
}
// export async function resetUserPassword({
//   email,
//   password,
// }: {
//   email: TUser["email"];
//   password: string;
// }) {
//   const passwordHash = await bcrypt.hash(password, 10);
//   return User.update({
//     where: { email },
//     data: {
//       passwordHash: passwordHash,
//     },
//   });
// }

// SESSION

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return await destroySession(session);
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserFromSession(
  request: Request
): Promise<TUser | null> {
  const userId = await getUserIdFromSession(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await getUserById(userId);
    return user;
  } catch {
    throw logout(request);
  }
}

/**
 * Check for session and return user id
 * @param request Request
 * @returns userId or null
 */
export async function getUserIdFromSession(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getOrganisationIdFromSession(request: Request) {
  const session = await getUserSession(request);
  const organisationId = session.get("organisationId");
  if (!organisationId || typeof organisationId !== "string") return null;
  return organisationId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function setSessionOrganisationId(organisationId: string) {
  const session = await getSession();
  session.set("organisationId", organisationId);
  const cookie = await commitSession(session);
  return cookie;
}
