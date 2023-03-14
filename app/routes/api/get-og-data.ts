import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";
import ogs from "open-graph-scraper";
import { badRequest } from "../../utils/request.server";
import { z } from "zod";

// const LinkOgData = z.object({
//   requestUrl: z.string(),
//   ogTitle: z.string(),
//   ogDescription: z.string(),
//   favicon: z.string(),
//   ogUrl: z.string().optional(),
//   ogImage: z.object({
//     height: z.string().optional(),
//     width: z.string().optional(),
//     type: z.string().nullable().optional(),
//     url: z.string().optional(),
//   }),
// });

const LinkOgData = z.object({
  requestUrl: z.string(),
  ogTitle: z.string(),
  ogDescription: z.string(),
  favicon: z.string(),
  ogUrl: z.string().optional(),
  // ogImage: z.object({
  //   height: z.string().optional(),
  //   width: z.string().optional(),
  //   type: z.string().nullable().optional(),
  //   url: z.string().optional(),
  // }),
});

export type TLinkOgData = z.infer<typeof LinkOgData>;

function validateImgUrl({
  imgUrl,
  requestUrl,
}: {
  imgUrl: string;
  requestUrl: string;
}) {
  let url;

  try {
    url = new URL(imgUrl);
  } catch (err) {
    url = new URL(imgUrl, requestUrl);
  }
  return url.href;
}

export async function loader({ request }: DataFunctionArgs) {
  console.log(request.url);
  const url = new URL(request.url).searchParams.get("url");
  if (!url) return badRequest("No URL provided");
  console.log("\n\n", url);

  const options = { url };
  const { error, response, result } = await ogs(options);

  const parsedResult = LinkOgData.parse(result);

  if (parsedResult)
    return json({
      data: {
        ...parsedResult,
        favicon: validateImgUrl({
          imgUrl: parsedResult.favicon,
          requestUrl: parsedResult.requestUrl,
        }),
        // ogImage: {
        //   ...parsedResult.ogImage,
        //   url: validateImgUrl({
        //     imgUrl: parsedResult.ogImage.url,
        //     requestUrl: parsedResult.requestUrl,
        //   }),
        // },
      },
    });
  if (error) return badRequest("fetching og link data failed!");
}

// const ogs = require('open-graph-scraper');
// const options = { url: 'http://ogp.me/' };
// ogs(options)
//   .then((data) => {
//     const { error, result, response } = data;
//     console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
//     console.log('result:', result); // This contains all of the Open Graph results
//     console.log('response:', response); // This contains the HTML of page
//   })
