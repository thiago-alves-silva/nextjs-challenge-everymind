import { ExperienceLevel } from "@/types/ExperienceLevel";

const normalizeExperienceLevel = (experienceLevel: ExperienceLevel) => {
  switch (experienceLevel) {
    case "internship":
      return "Estágio";
    case "junior":
      return "Júnior";
    case "full":
      return "Pleno";
    case "senior":
      return "Sênior";
    case "director":
      return "Diretor";
    default:
      return experienceLevel;
  }
};

export default normalizeExperienceLevel;
