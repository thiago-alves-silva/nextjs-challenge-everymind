"use client";
import { JobApi } from "@/types/IJob";
import { createContext, useContext, useState } from "react";

type JobWithoutId = Omit<JobApi, "_id" | "id_company">;

interface JobFormContext {
  formData: JobWithoutId;
  setFormData: React.Dispatch<React.SetStateAction<JobWithoutId>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  descriptions: { title: string; subtitle: string }[];
}

const JobFormContext = createContext<JobFormContext>({} as JobFormContext);

export const JobFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: JobWithoutId = {
    title: "",
    state: "",
    city: "",
    deadline_date: "",
    experience_level: "",
    work_model: "",
    salary: "0",
    description: "",
    steps: [],
    createdAt: "",
    active: true,
  };
  const [formData, setFormData] = useState<JobWithoutId>(initialState);
  const [step, setStep] = useState(0);
  const descriptions = [
    {
      title: "Publicar nova vaga",
      subtitle: "Informe os dados da vaga preenchendo os campos abaixo",
    },
    {
      title: "Etapas do processo",
      subtitle: "Adicione etapas de seleção no processo seletivo da sua vaga",
    },
  ];

  return (
    <JobFormContext.Provider
      value={{ formData, setFormData, step, setStep, descriptions }}
    >
      {children}
    </JobFormContext.Provider>
  );
};

export const useJobForm = () => useContext(JobFormContext);
