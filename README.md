# Welcome to Remix!

This is the New Orleans (Jazz) template which uses the following setup:

- Eslint and Prettier.
- Tailwind CSS for styling.
- Prisma for DB access (default SQLite).

It is set up so it can deploy to Heroku, but behind the scenes it just runs Express (see server.js).

Read the Remix docs here:

- [Remix Docs](https://remix.run/docs)

## First time running locally.

If this is the very first time running the project, you might need to create an initial migration with Prisma.
To do this run the command `prisma migrate dev --name init`. You can always run it using `npx` like this: `npx prisma migrate dev --name init`.

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Style references using Tailwind CSS

- [https://merakiui.com/](https://merakiui.com/)
- [https://tailblocks.cc/](https://tailblocks.cc/)
