import jwt from "jsonwebtoken";

/***
 * Generate JWT from user credentials
 * @param {object} config - Takes in an object of keys to encrypt in the token
 * @returns string - Json Web Token
 */
export const generateJWT = ({ id }: { id: string }) => {
  const jwtToken = process.env.JWT_TOKEN as string;
  return jwt.sign({ id }, jwtToken, { expiresIn: "1d" });
};
