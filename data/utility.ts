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

  LGAs.map((lga) => {
    // If the stateId is not in the states table, then log it out
    if (!stateIds.includes(lga.stateId)) {
      console.log(lga.stateId);
    }
  });
};

// checkStateCodesDuplicates();
checkStateIds();
