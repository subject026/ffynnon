import type { Organisation as TOrganisation } from "@prisma/client";
import { db } from "../../utils/db.server";
export type { TOrganisation };

async function create({
  name,
  slug = "",
  description = "",
}: {
  name: string;
  slug?: string;
  description?: string;
}) {
  return await db.organisation.create({
    data: {
      name,
      slug,
      description,
    },
  });
}

async function findById(id: string) {
  const organisation = await db.organisation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      links: true,
      memberships: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  return organisation;
}

async function findBySlug(slug: string) {
  const organisation = await db.organisation.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      description: true,
      memberships: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });

  return organisation;
}

export default {
  create,
  findById,
  findBySlug,
};
