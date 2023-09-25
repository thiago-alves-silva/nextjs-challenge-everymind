import { COMPANY_GET } from "@/api";
import { Company } from "@/types/ICompany";

const getCompany = async (id: string) => {
  const { url, options } = COMPANY_GET(id);
  const response = await fetch(url, options);

  if (response.ok) {
    const company = (await response.json()) as Company;

    return company;
  }

  return null;
};

export default getCompany;
