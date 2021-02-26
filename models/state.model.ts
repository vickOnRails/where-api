import mongoose from "mongoose";
import { IState } from "../types";

const stateSchema = new mongoose.Schema(
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
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const State = mongoose.model<IState>("State", stateSchema);

export default State;
