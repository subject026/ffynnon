import type { Prisma } from "@prisma/client";
import User from "../../models/User";

export type TUserPayload = Prisma.UserGetPayload<{
  include: {
    email: true;
    memberships: {
      select: {
        id: true;
        role: true;
        organisation: {
          select: {
            id: true;
            name: true;
            slug: true;
            profileImg: true;
          };
        };
      };
    };
  };
}>;

// export async function createUser(email: string) {
//   return await User.create(email);
// }

export async function getUserByEmail(email: string) {
  return await User.findByEmail(email);
}

export async function getUserById(id: string) {
  return await User.findById(id);
}
