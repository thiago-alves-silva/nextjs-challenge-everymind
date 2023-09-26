import { JobApi } from "./IJob";

export interface Company {
  _id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: number;
  state: string;
  city: string;
  password: string;
  profile_image?: string;
}
