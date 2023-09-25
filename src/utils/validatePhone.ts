import { phoneRegex } from "@/regex";

const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export default validatePhone;
