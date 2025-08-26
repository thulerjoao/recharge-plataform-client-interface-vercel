export type StoreType = {
  id: string;
  name: string;
  email: string;
  domain: string;
  logoUrl: string;
  miniLogoUrl: string;
  bannersUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  wppNumber: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  documentType: "cpf" | "cnpj";
  documentValue: string;
  emailVerified: boolean;
  store: StoreType;
  createdAt?: Date;
  updatedAt?: Date;
};
