import type { MembershipRole, Membership as TMembership } from "@prisma/client";
import { db } from "../../utils/db.server";
export type { TMembership };

async function create({
  role,
  userId,
  organisationId,
}: {
  role: MembershipRole;
  userId: string;
  organisationId: string;
}) {
  return await db.membership.create({
    data: {
      role,
      userId,
      organisationId,
    },
  });
}

async function findById(id: string) {
  const membership = await db.membership.findUnique({
    where: {
      id,
    },
  });

  return membership;
}

export default {
  create,
  findById,
};
