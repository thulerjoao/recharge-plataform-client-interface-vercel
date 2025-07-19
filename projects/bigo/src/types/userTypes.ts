export type UserType = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  documentType: "cpf" | "cnpj";
  documentValue: string;
  role: "MASTER_ADMIN" | "ADMIN" | "USER";
  storeId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
