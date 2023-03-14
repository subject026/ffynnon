import Link from "../../models/Link";

export async function createLink(args: {
  title: string;
  url: string;
  organisationId: string;
  thumbnailUrl?: string;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  iconUrl?: string;
}) {
  const link = await Link.create({
    ...args,
  });
  return link;
}
