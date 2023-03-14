import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import MainLayout from "../components/MainLayout/MainLayout";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import {
  Form,
  EmailInput,
  SubmitInput,
  FormControl,
  Label,
  FormTitle,
  Input,
} from "../packages/shared/components/Form";
import { config } from "../config";
import { badRequest } from "../utils/request.server";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Button from "../packages/shared/components/Button/Button";
import { getUserByEmail } from "../controllers/UserController";
import { createUserSession } from "../resources/Auth/AuthController.server";

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return badRequest({ message: "form submitted incorrectly" });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return json({
      message: "user not found",
    });
  }

  return createUserSession(user.id, "/");
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  const message = actionData?.message;

  const user = null;
  return (
    <MainLayout user={user}>
      <section className="max-w-xs m-auto px-6 py-4 flex flex-col gap-8">
        <Form>
          <FormTitle>Login</FormTitle>
          <div className="flex flex-col gap-6">
            <FormControl>
              <Label htmlFor="email">email</Label>
              <EmailInput
                // value={email}
                // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                //   setEmail(event.target.value)
                // }
                name="email"
              />
              <Label htmlFor="password">password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                required={true}
              />
            </FormControl>
            <FormControl>
              <Button type="submit">login</Button>
            </FormControl>
            {/* {registerError && (
            <FormControl>
            <p>{registerError.message}</p>
            </FormControl>
          )} */}
            {message && (
              <FormControl>
                <p>{message}</p>
              </FormControl>
            )}
          </div>
        </Form>
      </section>
    </MainLayout>
  );
}
