"use client";
import { CandidateApi } from "@/types/ICandidate";
import { createContext, useContext, useState } from "react";

type CandidateWithoutId = Omit<CandidateApi, "_id">;

interface CandidateFormContext {
  formData: CandidateWithoutId;
  setFormData: React.Dispatch<React.SetStateAction<CandidateWithoutId>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  descriptions: string[];
}

const CandidateFormContext = createContext<CandidateFormContext>(
  {} as CandidateFormContext
);

export const CandidateFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: CandidateWithoutId = {
    email: "",
    name: "",
    cpf: "",
    phone: "",
    birthdate: "",
    password: "",
    confirm_password: "",
    racial_identity: null,
    family_income: null,
    indigenous_descendancy: null,
    has_disability: null,
    is_lgbtqia: null,
    state: null,
    city: null,
    profile_image: null,
  };
  const [formData, setFormData] = useState<CandidateWithoutId>(initialState);
  const [step, setStep] = useState(0);
  const descriptions = [
    "Preencha os seus dados cadastrais para continuar a criação do seu perfil",
    "Crie uma senha para garantir a segurança do seu acesso à plataforma",
    "Para finalizar, complemente seu perfil com algumas informações sociais",
  ];

  return (
    <CandidateFormContext.Provider
      value={{ formData, setFormData, step, setStep, descriptions }}
    >
      {children}
    </CandidateFormContext.Provider>
  );
};

export const useCandidateForm = () => useContext(CandidateFormContext);
