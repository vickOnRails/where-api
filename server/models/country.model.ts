import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
