import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import MainLayout from "../components/MainLayout/MainLayout";
import { useActionData, useOutletContext } from "@remix-run/react";
import {
  EmailInput,
  FormControl,
  Label,
  FormTitle,
  Form,
  Input,
} from "../packages/shared/components/Form";
import { badRequest } from "../utils/request.server";
import Button from "../packages/shared/components/Button/Button";
import {
  createUserSession,
  register,
} from "../resources/Auth/AuthController.server";

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return badRequest({ message: "form submitted incorrectly" });
  }

  if (password !== confirmPassword) {
    return badRequest({ message: "passwords don't match" });
  }

  const newUser = await register({ email, password });

  return createUserSession(newUser.id, "/");
}

// export const loader = async ({ request }: DataFunctionArgs) => {
//   const env = {
//     SUPABASE_URL: process.env.SUPABASE_URL!,
//     SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
//   };

//   const response = new Response();

//   // const supabase = createServerClient(
//   //   process.env.SUPABASE_URL!,
//   //   process.env.SUPABASE_ANON_KEY!,
//   //   {
//   //     request,
//   //     response,
//   //   }
//   // );

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   return json(
//     {
//       session,
//     },
//     {
//       headers: response.headers,
//     }
//   );
// };

export default function Signup() {
  const actionData = useActionData<typeof action>();

  const message = actionData?.message;

  const user = null;
  return (
    <MainLayout user={user}>
      <section className="max-w-xs m-auto px-6 py-4 flex flex-col gap-8">
        <Form>
          <FormTitle>Register</FormTitle>
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
              <Label htmlFor="confirm_password">confirm password</Label>
              <Input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="******"
                required={true}
              />
            </FormControl>
            <FormControl>
              <Button type="submit">register</Button>
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
