import { useOutletContext } from "@remix-run/react";
import type { TOrgSlugLoaderData } from "../$organisationId";
import type { TLink } from "../../models/Link/Link";
import ButtonLink from "../../packages/shared/components/ButtonLink/ButtonLink";
import { LinkCard } from "../../packages/shared/components/LinkCard";
import { classNames, pagewrap } from "../../utils";

export default function OrgSlugIndex() {
  const { organisation } = useOutletContext<TOrgSlugLoaderData>();

  return (
    <>
      <section className={classNames(pagewrap)}>
        {organisation ? (
          <>
            <section className="py-16">
              <div className="prose">
                <h1 className="text-4xl font-bold">{organisation.name}</h1>
                <p>{organisation.description}</p>
                <h2>Links</h2>
              </div>
              <div className="flex flex-col gap-2">
                {organisation.links.map((link: TLink) => {
                  return <LinkCard key={link.id} link={link} />;
                })}
              </div>
            </section>
            <section>
              <ButtonLink to="add-link">add link</ButtonLink>
            </section>
          </>
        ) : (
          <p>organisation not found!</p>
        )}

        {/* {organisation.links && organisation.links.map((link) => {
      return (
        <article>
          <h3>{link.title}</h3>
        </article>
      )
    })} */}
      </section>
    </>
  );
}
