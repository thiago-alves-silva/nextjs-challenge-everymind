import { ADDRESS_BY_CEP_GET } from "@/api";
import { Address } from "@/types/IAddress";

const getAddressByCep = async (cep: string) => {
  const { url, options } = ADDRESS_BY_CEP_GET(cep);
  const response = await fetch(url, options);

  if (response.ok) {
    const address = await response.json();

    if ("erro" in address) {
      return address as { erro: string };
    }

    return address as Address;
  }

  return null;
};

export default getAddressByCep;
