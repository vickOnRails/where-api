import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: mongoose.Schema.Types.ObjectId,
    // Maybe switch up username or fullname or something like that
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/***
 * Function will run before the user is saved. Either when
 * created first or when subsequently edited
 * @return void
 */
userSchema.pre("save", async function (next) {
  // If the password wasn't modified, no need to regenerate the password with another salt
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.salt = salt;
});

userSchema.methods.matchPassword = async function (rawPassword) {
  try {
    return await bcrypt.compare(rawPassword, this.password);
  } catch (err) {
    throw new Error(err.message);
  }
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
