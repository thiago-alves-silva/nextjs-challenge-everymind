import { WorkModel } from "@/types/WorkModel";

const normalizeWorkModel = (workModel: WorkModel) => {
  switch (workModel) {
    case "hybrid":
      return "Híbrido";
    case "in_person":
      return "Presencial";
    case "remote":
      return "Remoto";
    default:
      return workModel;
  }
};

export default normalizeWorkModel;
