export type DeviceType = "mobile" | "tablet" | "desktop";

export type UserType = {
  name: string;
  email: string;
  cpf?: string;
};

export interface loginParams {
  email: string;
  password: string;
}
