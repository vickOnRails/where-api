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
    "cd269093-1687-4b31-8ec1-e978898b81fd",
    "6038eb35-8a14-4465-bcd0-419dd4614c2d",
    "1e39acb4-dc78-4bd1-ad16-3b8b03399d4b",
    "8acc4bb5-0b75-464d-8e6d-275e004db5b5",
    "2e7343e9-84a7-4092-918c-d1b5ce63312d",
    "8276768a-bb3d-43bc-942a-f4dccff87f39",
    "630bd76a-e320-457c-a82d-3d32686f39dd",
    "2724f5b6-e7be-4e73-a510-c709ffe28ef8",
    "4ea0ff5c-5089-4a1d-83e9-bc2215812c7b",
    "edfc7c7e-3bda-426f-b36b-9c8615c203fd",
    "86651068-31f8-45f6-85d6-bb6150aedf84",
    "b33ac251-0a62-4081-91b9-5f590998b2cb",
    "3a114496-90d9-475c-bef0-670839be6f34",
    "a8ff9b84-9451-4ebf-82e3-04187cc46e90",
    "b9f05d58-4046-40e2-88a6-0cae9260b1bf",
    "372bb4c0-f9ac-47a3-b4a4-3275f7611ea9",
    "57ae40df-fb74-471d-ad6a-1f2ca5ac693d",
    "fe79a477-7ca0-4c9c-97d6-00fe56c659c9",
    "e4c18d52-959b-4287-b4c6-10d4879e300e",
    "02f6a3cc-cb29-4872-800a-3a67415fcd3b",
    "84649caa-9995-4b83-975e-4ca221626c6b",
    "50564f5a-5dc0-40a7-af85-f6c28203c25b",
    "8c594187-00e7-4a4c-98fb-b9e40415a6ae",
    "c9aa6667-0c77-4674-b8fc-2e773c114bda",
    "a1264978-483f-4432-a118-f31728d31148",
    "022fab2e-cc4e-4bdd-98bc-a8c3e28ba1e2",
    "a55c7023-7ee6-41df-aa5a-b73783505278",
    "ba48ac76-cc03-4919-a095-4ec302337b67",
    "80cace5e-5094-4d7e-a45a-bfd1df6ba081",
    "3d30a058-c652-4dea-82c2-3e71b76661eb",
    "87e255b7-e3ae-4373-a9e9-ad094b78814e",
    "0addcbda-0515-4128-b17d-1386e720f331",
    "76a4e49c-370b-4ba4-b406-0cfed80ac8bc",
    "60450c7c-b1f7-4f1f-9f38-b5976bcf582f",
    "9cec8bf1-8b07-401b-9dae-e89c3402087b",
    "fca35659-af03-4f34-8b57-ec4dfc0d448d",
  ];

  LGAs.map((lga) => {
    // If the stateId is not in the states table, then log it out
    if (!stateIds.includes(lga.stateId)) {
      console.log(lga.stateId);
    }
  });
};

// checkStateCodesDuplicates();
// checkStateIds();
