import { PrismaClient } from "@prisma/client";
import states from "./states.json";
import lgas from "./lgas.json";

const pool = new PrismaClient();

const main = async () => {
  try {
    // await pool.state.deleteMany();
    await pool.lGA.deleteMany();

    // const newStates = await pool.state.createMany({
    //   data: states,
    // });

    const newLGAs = await pool.lGA.createMany({
      data: lgas,
    });

    // console.log(newStates);
    // console.log(newLGAs);
  } catch (err) {
    console.log(err.message);
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
    await pool?.$disconnect();
    process.exit(0);
  });
