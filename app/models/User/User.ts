import type { User as TUser } from "@prisma/client";
import { db } from "../../utils/db.server";
export type { TUser };

async function create({
  email,
  passwordHash,
}: {
  email: string;
  passwordHash: string;
}) {
  return await db.user.create({
    data: {
      email,
      passwordHash,
    },
  });
}

async function findByEmail(email: string) {
  const profile = await db.user.findUnique({
    where: {
      email,
    },
    include: {
      memberships: {
        select: {
          id: true,
          role: true,
          organisation: {
            select: {
              id: true,
              name: true,
              slug: true,
              profileImg: true,
            },
          },
        },
      },
    },
  });

  return profile;
}

async function findById(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      memberships: {
        select: {
          id: true,
          role: true,
          organisation: {
            select: {
              id: true,
              name: true,
              slug: true,
              profileImg: true,
            },
          },
        },
      },
    },
  });

  return user;
}

export default {
  create,
  findByEmail,
  findById,
};
