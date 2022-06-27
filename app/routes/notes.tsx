import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import { Select } from "~/atoms/forms/Select";
import { SelectOption } from "~/atoms/forms/SelectOption";
import { Typography } from "~/atoms/Typography";
import { Card } from "~/components/cards/Card";
import { CardBody } from "~/components/cards/CardBody";
import { CardHeader } from "~/components/cards/CardHeader";

export const loader: LoaderFunction = async ({ params }) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    select: { id: true, email: true },
  });

  // Check if the userId is present
  // and set selected user if it is.
  const userId = Number.parseInt(params.userId || "") || null;

  const selectedUser = userId ? users.find((user) => user.id === userId) : null;

  return json({ users, selectedUserId: selectedUser?.id });
};

export default function Index() {
  const navigate = useNavigate();
  const { users, selectedUserId } = useLoaderData<{
    users: User[];
    selectedUserId: number | null;
  }>();

  const initialUser = useMemo(
    () => users.find((user) => user.id === selectedUserId),
    [selectedUserId, users]
  );

  useEffect(() => {
    console.log("selectedUserId", selectedUserId);
  }, []);

  useEffect(() => {
    console.log("initialUser", initialUser);
  }, [initialUser]);

  const onUserSelected = (user: User) => {
    navigate(`/notes/user/${user.id}`);
  };

  return (
    <div className="flex flex-col gap-10 bg-slate-100 px-5 py-20 md:px-10 lg:px-20">
      <div>
        <Typography variant="h1">Notes</Typography>
        <Typography variant="lead">
          Select a user and create, read and delete notes.
        </Typography>
      </div>
      <div>
        <Card>
          <CardHeader>Select a user</CardHeader>
          <CardBody>
            <div>
              <label className="text-gray-700 dark:text-gray-200">User</label>
              <Select
                placeholder="Select a user"
                initialValue={initialUser}
                onChange={onUserSelected}
              >
                {users.map((user) => (
                  <SelectOption key={user.id} value={user}>
                    {user.email}
                  </SelectOption>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>
      </div>
      <Outlet />
    </div>
  );
}
