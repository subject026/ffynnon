import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { createLink } from "../../controllers/Link";
import LinkPreview from "../../packages/admin/components/LinkPreview";
import Button from "../../packages/shared/components/Button/Button";
import {
  Form,
  FormControl,
  Input,
  Label,
} from "../../packages/shared/components/Form";
import { getOrganisationIdFromSession } from "../../resources/Auth/AuthController.server";
import { classNames, pagewrap } from "../../utils";
import { badRequest } from "../../utils/request.server";
import type { TLinkOgData } from "../api/get-og-data";

export async function action({ request }: ActionArgs) {
  const organisationId = await getOrganisationIdFromSession(request);
  if (!organisationId)
    return badRequest({ message: "no organisation id attached to session" });

  const formdata = await request.formData();
  const url = formdata.get("url");
  const title = formdata.get("title");
  const description = formdata.get("description");
  // const thumbnailUrl = formdata.get("thumbnailUrl");
  // const thumbnailWidth = formdata.get("thumbnailWidth");
  // const thumbnailHeight = formdata.get("thumbnailheight");
  // const iconUrl = formdata.get("iconUrl");

  console.log({
    title,
    url,
    description,
  });

  if (
    typeof title !== "string" ||
    typeof url !== "string" ||
    typeof description !== "string"
  ) {
    return badRequest({ message: "form submitted incorrectly" });
  }

  const args = {
    title,
    url,
    organisationId,
  };

  const optionalArgs = {} as {
    thumbnailUrl?: string;
    thumbnailWidth?: string;
    thumbnailHeight?: string;
    iconUrl?: string;
  };

  // if (thumbnailUrl && typeof thumbnailUrl === "string")
  //   optionalArgs.thumbnailUrl = thumbnailUrl;
  // if (thumbnailWidth && typeof thumbnailWidth === "string")
  //   optionalArgs.thumbnailWidth = thumbnailWidth;
  // if (thumbnailHeight && typeof thumbnailHeight === "string")
  //   optionalArgs.thumbnailHeight = thumbnailHeight;
  // if (iconUrl && typeof iconUrl === "string") optionalArgs.iconUrl = iconUrl;
  // if (typeof thumbnailUrl !== "string" || typeof url !== "string") {
  //   return badRequest({ message: "form submitted incorrectly" });
  // }

  await createLink({ ...args, ...optionalArgs });

  return redirect(`/${organisationId}`);
}

export default function AddLink() {
  const fetcher = useFetcher();
  const [url, setUrl] = useState("");
  const [ogData, setOgData] = useState<null | TLinkOgData>(null);

  // <fetcher.Form />;

  useEffect(() => {
    if (!url.length) return;
    console.log(url);
    if (fetcher.state !== "idle") return;
    if (ogData) return;

    fetcher.load(`/api/get-og-data?url=${url}`);
  }, [fetcher, url, ogData]);

  useEffect(() => {
    if (fetcher.data) {
      // TODO parse minimum required values and display error if not enough data
      setOgData(fetcher.data.data);
    }
  }, [fetcher.data]);

  console.log({ ogData });

  function handleUrlInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (ogData && ogData.ogUrl === value) return;
    setUrl(value);
  }

  return (
    <section className={classNames(pagewrap)}>
      <div className="max-w-md prose">
        <h2>Add Link</h2>
        <Form>
          <FormControl>
            <Label htmlFor="url">Url</Label>
            <Input
              onChange={handleUrlInputChange}
              value={url}
              type="text"
              name="url"
              id="url"
              placeholder="url"
              required
            />
          </FormControl>
          {ogData && (
            <>
              <LinkPreview ogData={ogData} />
              <FormControl>
                <Label htmlFor="title">title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title"
                  defaultValue={ogData.ogTitle}
                  required
                />
              </FormControl>
              <FormControl>
                <Label htmlFor="description">description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  defaultValue={ogData.ogDescription}
                  required
                />
              </FormControl>
              {/* <input
                type="hidden"
                name="thumbnailUrl"
                id="thumbnailUrl"
                value={ogData.ogImage.url}
              /> */}
              {/* <input
                type="hidden"
                name="thumbnailWidth"
                id="thumbnailWidth"
                value={ogData.ogImage.width}
              />
              <input
                type="hidden"
                name="thumbnailHeight"
                id="thumbnailHeight"
                value={ogData.ogImage.height}
              /> */}

              <input
                type="hidden"
                name="iconUrl"
                id="iconUrl"
                value={ogData.favicon}
              />
            </>
          )}
          <FormControl>
            <Button type="submit" disabled={!ogData}>
              Add Link
            </Button>
          </FormControl>
        </Form>
      </div>
    </section>
  );
}
