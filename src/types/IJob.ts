import { ExperienceLevel } from "./ExperienceLevel";
import { WorkModel } from "./WorkModel";

export interface JobApi {
  _id: string;
  id_company: string;
  title: string;
  state: string;
  city: string;
  deadline_date: string;
  experience_level: string;
  work_model: string;
  salary: string | null;
  description: string;
  steps: Step[];
  createdAt: string;
  active: boolean;
}

export interface Job {
  id: string;
  id_company: string;
  title: string;
  state: string;
  city: string;
  deadline_date: Date;
  experience_level: ExperienceLevel;
  work_model: WorkModel;
  salary: number | null;
  description: string;
  steps: Step[];
  createdAt: Date;
  active: boolean;
}

export interface Step {
  label: string;
  online: boolean;
  questions: string | FormStep[];
}

export interface FormStep {
  label: string;
  type: FormStepInputTyoe;
  options?: { label: string; value: string }[];
}

export type FormStepInputTyoe = "checkbox" | "radio" | "number" | "text";
