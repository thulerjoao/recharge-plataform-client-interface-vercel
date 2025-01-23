export type DeviceType = "mobile" | "tablet" | "desktop";

export type AsideSelected =
  | "home"
  | "sales"
  | "products"
  | "resellers"
  | "wallet"
  | "config";

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};
