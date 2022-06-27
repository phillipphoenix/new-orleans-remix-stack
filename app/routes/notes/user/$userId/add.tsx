import type { Note } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import { z } from "zod";

import { zfd } from "zod-form-data";
import { Input } from "~/atoms/forms/Input";
import { SubmitButton } from "~/atoms/forms/SubmitButton";
import { TextArea } from "~/atoms/forms/TextArea";
import { Card } from "~/components/cards/Card";
import { CardBody } from "~/components/cards/CardBody";
import { CardHeader } from "~/components/cards/CardHeader";

const validator = withZod(
  zfd.formData({
    title: zfd.text(z.string().min(10)),
    body: zfd.text(),
  })
);

export const action: ActionFunction = async ({ request, params }) => {
  // Check if the userId is present.
  invariant(params.userId, "Expected params.userId");
  const userId = Number.parseInt(params.userId);

  // Use the validator in both the action and the component.
  // Using it here includes server side validation.
  // In the component it can validate without sending a request to the server.
  const result = await validator.validate(await request.formData());
  const { data, error } = result;

  if (error) {
    // validationError comes from `remix-validated-form`
    return validationError(error);
  }

  const { title, body } = data as Note;

  const prisma = new PrismaClient();

  await prisma.note.create({
    data: { title, body, userId: userId },
  });
  return redirect(`/notes/user/${userId}`);
};

export default function Add() {
  const data = useActionData();

  return (
    <div>
      <Card>
        <CardHeader>
          Create a{" "}
          <span className="underline decoration-lime-500 decoration-2">
            new
          </span>{" "}
          note!
        </CardHeader>
        <CardBody>
          <ValidatedForm validator={validator} method="post">
            <Input label="Title" name="title" />
            <TextArea label="Body" name="body" />
            {data && (
              <div>
                <div>{data.title}</div>
                <div>{data.description}</div>
              </div>
            )}
            <SubmitButton label="Create" whileSubmittingLabel="Creating..." />
          </ValidatedForm>
        </CardBody>
      </Card>
    </div>
  );
}
