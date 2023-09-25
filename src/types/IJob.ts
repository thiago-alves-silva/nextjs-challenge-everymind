export interface Step {
  label: string;
  online: boolean;
  step: string | FormStep[];
}

export interface FormStep {
  label: string;
  type: "checkbox" | "radio" | "number" | "text";
  options?: { label: string; value: string }[];
}

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
  experience_level: string;
  work_model: string;
  salary: number | null;
  description: string;
  steps: Step[];
  createdAt: Date;
  active: boolean;
}
