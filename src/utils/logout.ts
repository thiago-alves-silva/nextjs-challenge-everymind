"use server";
import { cookies } from "next/headers";

const logout = async () => {
  cookies().delete("token"); // remover token de autenticação
};

export default logout;
