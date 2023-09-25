import { Candidate, CandidateApi, isRacialIdentity } from "@/types/ICandidate";

const normalizeCandidate = (candidateApi: CandidateApi): Candidate => {
  const racialIdentity = candidateApi.racial_identity || "";

  const candidate: Candidate = {
    id: candidateApi._id,
    email: candidateApi.email,
    name: candidateApi.name,
    cpf: candidateApi.cpf,
    phone: candidateApi.phone,
    birthDate: new Date(candidateApi.birthdate),
    password: candidateApi.password,
    racial_identity: isRacialIdentity(racialIdentity) ? racialIdentity : null,
    family_income: candidateApi.family_income,
    indigenous_descendancy: candidateApi.indigenous_descendancy,
    has_disability: candidateApi.has_disability,
    is_lgbtqia: candidateApi.is_lgbtqia,
    state: candidateApi.state,
    city: candidateApi.city,
  };

  return candidate;
};

export default normalizeCandidate;
