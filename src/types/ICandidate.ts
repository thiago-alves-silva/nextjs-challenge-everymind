import { RacialIdentity } from "./RacialIdentity";

export interface Candidate {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthdate: Date;
  password: string;
  racial_identity: RacialIdentity | null;
  family_income: string | null;
  indigenous_descendancy: boolean | null;
  has_disability: boolean | null;
  is_lgbtqia: boolean | null;
  state: string | null;
  city: string | null;
  profile_image: string | null;
}

export interface CandidateApi {
  _id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birthdate: string;
  password: string;
  confirm_password: string;
  racial_identity: string | null;
  family_income: string | null;
  indigenous_descendancy: boolean | null;
  has_disability: boolean | null;
  is_lgbtqia: boolean | null;
  state: string | null;
  city: string | null;
  profile_image: string | null;
}

export const isRacialIdentity = (value: string): value is RacialIdentity => {
  const racialIdentities = ["branco", "pardo", "preto", "amarelo", "indigena"];

  return racialIdentities.includes(value);
};
