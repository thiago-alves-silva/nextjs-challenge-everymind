import { User } from "./User";

export interface UserLogin {
  email: string;
  password: string;
  user: User;
}

export const isUserLogin = (object: unknown): object is UserLogin => {
  if (
    object &&
    typeof object === "object" &&
    "email" in object &&
    "password" in object &&
    "user" in object
  ) {
    return true;
  }

  return false;
};
