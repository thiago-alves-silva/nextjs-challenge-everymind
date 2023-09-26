import { CandidateFilter } from "./types/ICandidateFilter";
import { JobFilter } from "./types/IJobFilter";

const BASE_URL = "http://localhost:3000";

interface RequestConfig {
  url: URL;
  options: RequestInit;
}

export const LOGIN_USER_POST = (payload: any): RequestConfig => {
  return {
    url: new URL("/api/account/login", BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const CANDIDATE_POST = (payload: any): RequestConfig => {
  return {
    url: new URL("/api/account/register/candidate", BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const CANDIDATE_PUT = (payload: any): RequestConfig => {
  return {
    url: new URL("/api/account/register/candidate", BASE_URL),
    options: {
      method: "put",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const COMPANY_POST = (payload: any): RequestConfig => {
  return {
    url: new URL("/api/account/register/company", BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const COMPANY_PUT = (payload: any): RequestConfig => {
  return {
    url: new URL("/api/account/register/company", BASE_URL),
    options: {
      method: "put",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const ADDRESS_BY_CEP_GET = (cep: string): RequestConfig => {
  return {
    url: new URL(`/api/address/${cep}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const JOB_GET = (jobId: string): RequestConfig => {
  return {
    url: new URL(`/api/job/${jobId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const JOBS_GET = (filters: JobFilter | {} = {}): RequestConfig => {
  const url = new URL(`/api/job`, BASE_URL);

  Object.entries(filters).forEach(([key, value]) => {
    [value].flat().forEach((v) => {
      if (v !== null) {
        url.searchParams.append(key, v);
      }
    });
  });

  return {
    url,
    options: {
      method: "get",
    },
  };
};

export const CANDIDATURE_POST = (
  jobId: string,
  payload: any
): RequestConfig => {
  return {
    url: new URL(`/api/job/${jobId}/apply`, BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const CANDIDATURES_GET = (candidateId: string): RequestConfig => {
  return {
    url: new URL(`/api/candidate/${candidateId}/candidatures`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const CANDIDATURE_PUT = (
  candidatureId: string,
  payload: any
): RequestConfig => {
  return {
    url: new URL(`/api/candidatures/${candidatureId}`, BASE_URL),
    options: {
      method: "put",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const CANDIDATURES_BY_JOB_ID_GET = (jobId: string): RequestConfig => {
  return {
    url: new URL(`/api/candidatures?job_id=${jobId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const CANDIDATURE_GET = (candidatureId: string): RequestConfig => {
  return {
    url: new URL(`/api/candidatures/${candidatureId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const CANDIDATE_GET = (candidateId: string): RequestConfig => {
  return {
    url: new URL(`/api/candidate/${candidateId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const CANDIDATE_PROFILE_IMAGE_POST = (
  candidateId: string,
  payload: any
): RequestConfig => {
  return {
    url: new URL(`/api/candidate/${candidateId}/image`, BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const COMPANY_PROFILE_IMAGE_POST = (
  companyId: string,
  payload: any
): RequestConfig => {
  return {
    url: new URL(`/api/company/${companyId}/image`, BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const COMPANY_GET = (companyId: string): RequestConfig => {
  return {
    url: new URL(`/api/company/${companyId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const CANDIDATES_GET = (
  filters: CandidateFilter | {} = {}
): RequestConfig => {
  const url = new URL(`/api/candidate`, BASE_URL);

  Object.entries(filters).forEach(([key, value]) => {
    [value].flat().forEach((v) => {
      if (v !== null) {
        url.searchParams.append(key, v);
      }
    });
  });

  return {
    url,
    options: {
      method: "get",
    },
  };
};

export const JOBS_BY_COMPANY_GET = (companyId: string): RequestConfig => {
  return {
    url: new URL(`/api/job?company_id=${companyId}`, BASE_URL),
    options: {
      method: "get",
    },
  };
};

export const JOB_POST = (payload: any): RequestConfig => {
  return {
    url: new URL(`/api/job`, BASE_URL),
    options: {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const DISABLE_JOB_PUT = (jobId: string): RequestConfig => {
  return {
    url: new URL(`/api/job/${jobId}`, BASE_URL),
    options: {
      method: "put",
      body: JSON.stringify({ active: false }),
      headers: { "Content-Type": "application/json" },
    },
  };
};

export const CANDIDATE_STATISTICS_BY_JOB_GET = (
  jobId: string
): RequestConfig => {
  return {
    url: new URL(`/api/job/${jobId}/statistics`, BASE_URL),
    options: {
      method: "get",
    },
  };
};
