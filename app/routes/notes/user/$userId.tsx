import type { Note, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import invariant from "tiny-invariant";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Button } from "~/atoms/buttons/Button";
import { Typography } from "~/atoms/Typography";
import { Card } from "~/components/cards/Card";
import { CardBody } from "~/components/cards/CardBody";
import { CardFooter } from "~/components/cards/CardFooter";
import { CardHeader } from "~/components/cards/CardHeader";

const deleteValidator = withZod(
  zfd.formData({
    intent: zfd.text(z.enum(["delete"])),
    noteId: zfd.numeric(),
  })
);

export const loader: LoaderFunction = async ({ params }) => {
  // Check if the userId is present.
  invariant(params.userId, "Expected params.userId");
  const userId = Number.parseInt(params.userId);

  const prisma = new PrismaClient();

  // Get the user.
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { id: true, email: true },
  });

  const notes = await prisma.note.findMany({
    where: { userId },
  });

  return json({ user, notes });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const result = await deleteValidator.validate(formData);
    const { data, error } = result;

    if (error) {
      throw error;
    }

    const { noteId } = data;

    const prisma = new PrismaClient();
    return prisma.note.delete({ where: { id: Number(noteId) } });
  }
};

export default function UserNotes() {
  const { user, notes } = useLoaderData<{ user: User; notes: Note[] }>();

  return (
    <div>
      <Typography variant="h2">User: {user.email}</Typography>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {notes?.map((note) => (
          <Card key={note.id}>
            <CardHeader>{note.title}</CardHeader>
            <CardBody>
              <p>{note.body}</p>
            </CardBody>
            <CardFooter>
              <div className="ml-auto flex flex-row gap-1">
                <Form method="post">
                  <input type="hidden" name="noteId" value={note.id} />
                  <Button name="intent" value="delete" colourScheme="danger">
                    Delete
                  </Button>
                </Form>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="py-10">
        <Link to={`/notes/user/${user.id}/add`}>
          <Button>Add a note!</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
