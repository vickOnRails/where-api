export interface ICountry {
  _id: string;
  code: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IState {
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
export interface IUser {
  _id: string;
  email: string;
  hashedPassword: string;
  salt: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
