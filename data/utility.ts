import bcrypt from "bcryptjs";
import LGAs from "./lgas.json";

// find states with code duplicates and log them to the console
export const checkStateCodesDuplicates = () => {
  let arr: string[] = [];

  LGAs.map((lga) => {
    if (arr.includes(lga.code)) {
      console.log(lga.code);
    } else {
      arr.push(lga.code);
    }
  });
};

// This function loops through all the lgas and finds the one that is referencing a state that does not exist
// It spits it out to the terminal

// First, we have to give this function a list of all the confirmed StateIds from the database
const checkStateIds = () => {
  const stateIds = [
    "0b8753e8-77b3-4646-a2f8-a40dd4d00f8a", // Abia
    "e1e55cab-3e25-49e1-a22f-900c5cbeea56", // Abuja
    "29c565a4-73fd-446e-b097-2f51bbed422e", // Adamawa
    "fd4fb39a-e28b-42fd-839c-a934904ec53f", // Akwa Ibom
    "5b2af037-0b1e-4409-90d5-034aa4607098", // Anambara
    "b04fbd24-5fa3-40d2-92d6-12903e2abe10", // Bauchi
    "9d8c0458-bae0-4a98-b86a-63b211188778", // Bayelsa
    "7f1f1adb-383a-477f-8d0b-6c45aaa9b5a2", // Benue
    "032bb63f-f40e-449d-bbcc-a4c827629182", // Borno
    "a7425c88-2a70-4fd0-8f9a-78987b56dfe6", // cross-river
    "d10fbd1b-2e56-40a1-a363-efbf5b22ffa5", // delta
    "e42dca5f-bef5-4d01-a008-c894a7b9aeba", // ebony
    "2bd54e65-526f-4734-a2f3-76dd23731774", // edo
    "1e5f00e7-12a3-43a5-bd11-073a9488d82a", //ekiti
    "29ee2439-43f2-42e3-96cc-d283b2af0faa", // enugu
    "05c06797-9ed7-45b8-b99f-3a756cc30a31", // gombe
    "b6b37c4d-7b82-4edc-a2b7-c5690d5ceb84", // imo
    "91fd3f1a-9a29-4589-aa22-040cc51e474f", // jigawa
    "a053ce5f-a8c4-4de8-bb36-ad24b8cb0598", // kaduna
    "7c7d1a07-a0a6-41f2-983f-6cf2d6d98700", // kano
    "0bb7f7f6-8e56-44ba-8bd5-7b42ab343814", // katsina
    "567b1b6d-3e50-49f1-9049-210e31860263", // kebbi
    "3d034879-4e3d-43dd-9adb-e69f46d71a16", // kogi
    "4f199d94-e199-495b-9bfe-3c7c4f38dadb", // kwara
    "909ea040-7812-4953-970e-48f29ac2d8c5", // lagos
    "3233ca12-b3eb-4818-8d3c-fa709b0c71c8", // nasarawa
    "b4ae1170-796e-4390-a42d-c0109e66495d", // niger
    "636bbb07-b3b0-43a7-8caf-ade121111dec", // ogun
    "d87eed05-d215-4c95-82a7-31a089ef3e7a", // ondo
    "5153d2d3-e5c6-4973-b098-fc5c5e8bc4e2", // osun
    "561bd761-5b6b-44e7-90a4-30fd7dfd5c06", // oyo
    "bd00e68b-a812-4385-8e53-b05b732d4eaf", //plateau
    "6178543e-02e9-4a03-9692-c9f43e2fac44", // rivers
    "746915a0-ee4f-42cb-a714-dbe7a65b5bd4", // sokoto
    "a36c825f-b7a9-4f4d-99bb-a13b6a1ce40f", // taraba
    "3b338872-b1ac-425b-a402-7259d8b69bb3", // yobe
    "190e8f9c-7d01-4550-aaa6-7bdd6c1e6891", // zamfara
  ];

  // const stateIds = [
  //   "3a456bde-7b1d-4435-8a4b-1897625ff4d0", // Abia
  //   "3614f67f-5132-49b4-8aab-acf3844bf6cf", // Abuja
  //   "5131db18-3e1e-402d-9fa6-1d683a528df2", // Adamawa
  //   "a4b5d94d-1523-429d-842f-2391fdaafe8e", // Akwa Ibom
  //   "3d888902-85b2-4710-aaf7-55e5cad1c869", // Anambara
  //   "128d7147-50c2-42fd-a046-25c70229fbdf", // Bauchi
  //   "1324b231-e6d9-41c9-9a2a-2c7ad246b698", // Bayelsa
  //   "622d6282-9ce6-485c-ba9b-28b851804623", // Benue
  //   "882a302f-9a86-41f7-b072-d5415e1e720e", // Borno
  //   "0bed493c-9620-42d1-b636-4c06803360c6", // cross-river
  //   "14a58f93-977b-446a-ad96-40835ed756bc", // delta
  //   "07cfaad0-850c-4c9a-8abc-76098405bbc4", // ebony
  //   "6f1bdcc5-d9d3-4825-8d6c-268bc5eb7d29", // edo
  //   "b324c0d3-9726-4589-82e0-c737855ca31d", //ekiti
  //   "28a267f6-b28e-4a7d-a4d0-4242331ecb4b", // enugu
  //   "fe441535-c526-46c0-9ca4-be11374dc375", // gombe
  //   "c2adf117-37c9-402c-89b0-f4a393115863", // imo
  //   "454a59cc-d7bc-4a6e-b5ae-6736b506dfbb", // jigawa
  //   "f03b8da3-437b-45ac-a725-7cc4c005fbf0", // kaduna
  //   "240bd3f9-68ba-4823-b42f-7c1fca3b9eeb", // kano
  //   "0bb7f7f6-8e56-44ba-8bd5-7b42ab343814", // katsina
  //   "95c3eb4f-6d6e-40f0-a2e0-ba5c94f4a1da", // kebbi
  //   "d0fb5ce8-1674-4425-a6c4-db0f202ce3d3", // kogi
  //   "018ba65a-e987-4c76-a139-7a288ed7153f", // kwara
  //   "8cb055e7-1038-4e6c-8e0c-3a5dc3e26b13", // lagos
  //   "4d537fa2-f543-400d-a34b-216b4b5c5c8e", // nasarawa
  //   "02cffe2e-53f8-4ca3-bb5b-112077c0469b", // niger
  //   "79fef5e6-e734-4f8c-99cc-cec86351132f", // ogun
  //   "c3eae791-7c10-4c48-ac1d-a841d6966bb7", // ondo
  //   "d29543f3-22d0-44ed-ab32-f34b4dc81d5e", // osun
  //   "43b647ea-98db-4c4e-ade3-16050b1328dd", // oyo
  //   "a7ece1ae-41ea-42bb-b7fc-491c89f44576", //plateau
  //   "460b9488-b380-44d3-a189-2e142abdb373", // rivers
  //   "119bd7b6-ff88-4715-af2e-6c09b9e4acb0", // sokoto
  //   "bf1c3f73-4ed0-4248-94fc-486ccecc108b", // taraba
  //   "46dc631f-da7f-436e-bedd-3e0e769c8f50", // yobe
  //   "3780576f-4aa0-4390-9c19-bd53eb935ef3", // zamfara
  // ];

  LGAs.map((lga) => {
    // If the stateId is not in the states table, then log it out
    if (!stateIds.includes(lga.stateId)) {
      console.log(lga.stateId);
    }
  });
};

const encryptPassword = async () => {
  const password = "123456";
  let salt: string = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt);

  console.log(hashedPassword, salt);
};

// checkStateCodesDuplicates();
// checkStateIds();
encryptPassword();
