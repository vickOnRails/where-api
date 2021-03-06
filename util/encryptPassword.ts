import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string) => {
  if (!password) throw new Error("Please provide a password");

  let salt: string = await bcrypt.genSalt();
  let hashedPassword: string = await bcrypt.hash(password, salt);

  return { hashedPassword, salt };
};
