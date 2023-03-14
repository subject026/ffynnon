import Organisation from "../../models/Organisation";

export async function createOrganisation({ name }: { name: string }) {
  const organisation = await Organisation.create({
    name,
  });
  return organisation;
}

export async function getOrganisationById(id: string) {
  return await Organisation.findById(id);
}

export async function getOrganisationBySlug(slug: string) {
  return await Organisation.findBySlug(slug);
}
