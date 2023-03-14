import type { TLinkOgData } from "~/routes/api/get-og-data";

export default function LinkPreview({ ogData }: { ogData: TLinkOgData }) {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex gap-4">
        <img src={ogData.favicon} className="w-8 h-8" alt="" />
        <h3 className="">{ogData.requestUrl}</h3>
      </div>
      <p>{ogData.ogDescription}</p>
    </article>
  );
}
