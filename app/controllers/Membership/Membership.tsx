import type { MembershipRole } from "@prisma/client";
import Membership from "../../models/Membership";

export async function createMembership({
  role,
  userId,
  organisationId,
}: {
  role: MembershipRole;
  userId: string;
  organisationId: string;
}) {
  const membership = await Membership.create({
    role,
    userId,
    organisationId,
  });
  return membership;
}
