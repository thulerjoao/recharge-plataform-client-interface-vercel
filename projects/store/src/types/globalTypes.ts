//=========== types =============
export type DeviceType = "mobile" | "tablet" | "desktop";

export type UserType = {
  name: string;
  email: string;
  cpf?: string;
};

export type ProductType = {
  name: string;
  about: string;
  instructions: string;
  imgBannerUrl: string;
  imgCardUrl: string;
  packages: PackagesType[];
};

export type PackagesType = {
  name: string;
  amountCredits: number;
  imgCardUrl: string;
  isOffer: boolean;
  baseCost: number;
  paymentMethods: PaymentMethodsType[];
};

export type PaymentMethodsType = {
  name: string;
  rate: number;
};

//=========== interfaces =============

export interface loginParams {
  email: string;
  password: string;
}
