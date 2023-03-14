import type { TLink } from "~/models/Link/Link";

export function LinkCard({ link }: { link: TLink }) {
  return (
    <article className="w-full flex gap-6 justify-between py-4 ">
      <div className="flex flex-col gap-1">
        <a href={link.url} className="hover:underline">
          <h3 className="text-2xl font-bold text-neutral-700 hover:text-neutral-800">
            {link.url}
          </h3>
        </a>
        <h4>{link.title}</h4>
        {link.description && <p>{link.description}</p>}
      </div>
      <div className="h-full">
        <img className="h-16" src={link.thumbnailUrl} alt="" />
      </div>
    </article>
  );
}
