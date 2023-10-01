import { RacialIdentity } from "@/types/RacialIdentity";

const normalizeRacialIdentity = (racialIdentity: RacialIdentity) => {
  switch (racialIdentity) {
    case "amarelo":
      return "Amarelo";
    case "branco":
      return "Branco";
    case "indigena":
      return "Indígena";
    case "pardo":
      return "Pardo";
    case "preto":
      return "Preto";
    default:
      return racialIdentity;
  }
};

export default normalizeRacialIdentity;
