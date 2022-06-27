import type { Note, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/atoms/buttons/Button";
import { Typography } from "~/atoms/Typography";
import { Card } from "~/components/cards/Card";
import { CardBody } from "~/components/cards/CardBody";
import { CardFooter } from "~/components/cards/CardFooter";
import { CardHeader } from "~/components/cards/CardHeader";

export default function Index() {
  return (
    <div className=" h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-900">
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-[url('/img/jazz-bg.jpg')] bg-cover">
          <CardHeader>
            <Typography
              variant="h1"
              className="mt-10 mb-5 text-center text-white"
            >
              Welcome to the New Orleans Remix stack
            </Typography>
          </CardHeader>
          <CardBody>
            <Typography className="text-white">
              <>
                This stack contains the following{" "}
                <span className="font-semibold underline decoration-sky-500 decoration-2">
                  features:
                </span>
              </>
            </Typography>
            <div className="grid gap-8 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <span className="rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-500/40 p-3 text-center text-white shadow-lg">
                Eslint and Prettier
              </span>
              <span className="rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-500/40 p-3 text-center text-white shadow-lg">
                Tailwind CSS for styling
              </span>
              <span className="rounded-lg border-2 border-dashed border-indigo-500 bg-indigo-500/40 p-3 text-center text-white shadow-lg">
                Prisma for DB access
              </span>
            </div>
          </CardBody>
          <CardFooter>
            <div className="my-10 flex w-full flex-row justify-center">
              <Link to="/notes">
                <Button className="px-10 py-5 text-xl">See notes</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
