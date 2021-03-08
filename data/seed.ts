import { PrismaClient } from "@prisma/client";
import states from "./states.json";
import lgas from "./lgas.json";

const prisma = new PrismaClient();

const ALL = `--all`;
const STATES = `--states`;
const LGAS = `--lgas`;

const main = async () => {
  const { argv } = process;

  if (argv[2] === ALL) {
    await seedNGStates();
    await seedNGLGAs();
  }
  if (argv[2] === STATES) {
    await seedNGStates();
  }
  if (argv[2] === LGAS) {
    await seedNGLGAs();
  }
};

const seedNGLGAs = async () => {
  console.log(`Seeding Nigerian Local Govts`);
  try {
    await prisma.lGA.deleteMany();
    const newLGAs = await prisma.lGA.createMany({
      data: lgas,
    });

    console.log(`Successfully seeded Nigerian LGAs`);
    console.table(newLGAs);
  } catch (err) {
    console.log(err);
  }
};

const seedNGStates = async () => {
  console.log(`Seeding Nigerian States`);
  try {
    await prisma.state.deleteMany();
    const newStates = await prisma.state.createMany({
      data: states,
    });

    console.log(`Successfully seeded Nigerian states`);
    console.table(newStates);
  } catch (err) {
    console.log(err);
  }
};

main()
  .then(() => {
    console.log(`Seeding successful`);
  })
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma?.$disconnect();
    process.exit(0);
  });
