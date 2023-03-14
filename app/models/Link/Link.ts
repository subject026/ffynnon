import type { Link as TLink } from "@prisma/client";
import { db } from "../../utils/db.server";
export type { TLink };

async function create(args: {
  title: string;
  url: string;
  organisationId: string;
  thumbnailUrl?: string;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  iconUrl?: string;
}) {
  return await db.link.create({
    data: {
      ...args,
    },
  });
}

async function findById(id: string) {
  const link = await db.link.findUnique({
    where: {
      id,
    },
  });

  return link;
}

export default {
  create,
  findById,
};
