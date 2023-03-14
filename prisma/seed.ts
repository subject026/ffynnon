import Membership from "../app/models/Membership";
import User from "../app/models/User";

import { faker } from "@faker-js/faker";
import { db } from "../app/utils/db.server";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("password", 10);
  const user = await db.user.create({
    data: {
      email: "subject026@protonmail.com",
      passwordHash,
    },
  });

  const cheeseLovers = await db.organisation.create({
    data: {
      name: faker.company.name(),
      description: "cheese or death",
      profileImg: faker.image.animals(100, 100),
    },
  });

  const bigBikes = await db.organisation.create({
    data: {
      name: faker.company.name(),
      description: "we have biggest bikes",
      profileImg: faker.image.animals(100, 100),
    },
  });

  const membership = await Membership.create({
    role: "ADMIN",
    userId: user.id,
    organisationId: bigBikes.id,
  });
}

main();
