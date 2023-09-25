import { emailRegex } from "@/regex";

const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export default validateEmail;
