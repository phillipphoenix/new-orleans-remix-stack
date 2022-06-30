import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Find or create user. */
async function createUser(email: string, password: string) {
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user) {
    return user;
  }

  return await prisma.user.create({
    data: {
      email: email,
      password: password, // TODO: Properly hash this if managing user login data (not using third party login provider).
    },
  });
}

/** Find or create note. */
async function createNote(userId: number, title: string, body: string) {
  const note = await prisma.note.findFirst({
    where: { userId: userId, title: title, body: body },
  });
  if (note) {
    return note;
  }
  return prisma.note.create({
    data: {
      title: title,
      body: body,
      userId: userId,
    },
  });
}

async function seed() {
  // Create users.
  const user1 = await createUser("test@example.com", "test1234");
  const user2 = await createUser("test-other@example.com", "test1234");

  // Create notes.
  const note1Promise = createNote(user1.id, "Test note", "Am I a real note?");
  const note2Promise = createNote(
    user1.id,
    "Which song?",
    "Some... Body... just told me..."
  );

  const note3Promise = createNote(
    user2.id,
    "What a note to have",
    "This should remind me about everything that I shouldn't forget. That would be super awesome, as this would then be the ultimate note!"
  );

  // Wait for all notes to be created.
  await Promise.all([note1Promise, note2Promise, note3Promise]);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => console.error(e))
  .finally(() => process.exit(0));

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     try {
//       await prisma.$disconnect();
//       process.exit(0);
//     } catch (e) {
//       console.error(e);
//       process.exit(1);
//     }
//   });
