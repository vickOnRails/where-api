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
  id: string;
  name: string;
  code: string;
  description: string;
  country: string;
  countryId?: string;
  countryName: string;
  countryCode: string;
  postalCode?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  username: string;
  salt: string;
  isAdmin: boolean;
  apiKey: string;
  usage: {
    date: Date;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (rawPassword: string) => boolean;
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
