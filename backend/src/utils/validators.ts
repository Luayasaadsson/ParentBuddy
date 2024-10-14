import bcrypt from "bcrypt";

export const validateAndHashPassword = async (
  password: string
): Promise<{ error: string | null; hashedPassword: string | null }> => {
  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
      hashedPassword: null,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return { error: null, hashedPassword };
};
