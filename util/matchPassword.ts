import bcrypt from "bcryptjs";

// FIXME: Use appropriate types here
export const matchPassword = async (password: string, user: any) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    throw new Error(err.message);
  }
};
