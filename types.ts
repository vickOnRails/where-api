import { Document } from "mongoose";
export interface ICountry extends Document {
  _id: string;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IState extends Document {
  _id: string;
  name: string;
  code: string;
  description: string;
  country: string;
  countryName: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Document {
  _id: string;
  email: string;
  hashedPassword: string;
  salt: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ILGA extends Document {
  _id: string;
  name: string;
  code: string;
  description: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}
