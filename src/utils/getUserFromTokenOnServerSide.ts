import { UserFromToken } from "@/types/IUserFromToken";
import { cookies } from "next/headers";

const getUserFromTokenOnServerSide = () => {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const [, data] = token.split(".");
      const user = JSON.parse(atob(data));

      return user as UserFromToken;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export default getUserFromTokenOnServerSide;
