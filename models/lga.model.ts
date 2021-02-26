import mongoose, { Model, Document } from "mongoose";
import { ILGA } from "../types";

const lgaSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    stateCode: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LGA = mongoose.model<ILGA>("Lga", lgaSchema);

export default LGA;
