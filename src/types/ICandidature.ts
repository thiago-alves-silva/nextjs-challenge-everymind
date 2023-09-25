import { Company } from "./ICompany";
import { Job } from "./IJob";

export interface StepAnswer {
  step: number;
  values: (string | string[])[];
}

export interface Candidature {
  _id: string;
  candidate_id: string;
  job_id: string;
  current_step: number;
  curriculum: string;
  answers?: StepAnswer[];
  feedback?: string;
}

export interface CandidatureWithJobAndCompany extends Candidature {
  job: Job | null;
  company: Company | null;
}
