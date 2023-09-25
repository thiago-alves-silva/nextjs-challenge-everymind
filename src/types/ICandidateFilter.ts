import { RacialIdentity } from "./RacialIdentity";

export interface CandidateFilter {
  racial_identity: RacialIdentity[] | null;
  family_income: string[] | null;
  indigenous_descendancy: boolean | null;
  has_disability: boolean | null;
  is_lgbtqia: boolean | null;
}
