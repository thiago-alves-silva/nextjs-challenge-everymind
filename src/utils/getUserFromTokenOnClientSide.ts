import { UserFromToken } from "@/types/IUserFromToken";
import getCookieByName from "./getCookieByName";

const getUserFromTokenOnClientSide = () => {
  const token = getCookieByName(document.cookie, "token");

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

export default getUserFromTokenOnClientSide;
