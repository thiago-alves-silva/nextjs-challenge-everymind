import { CANDIDATURE_GET } from "@/api";
import { Candidature } from "@/types/ICandidature";

const getCandidature = async (id: string): Promise<Candidature | null> => {
  const { url, options } = CANDIDATURE_GET(id);
  const response = await fetch(url, options);

  if (response.ok) {
    const candidature = (await response.json()) as Candidature;
    return candidature;
  }

  return null;
};

export default getCandidature;
