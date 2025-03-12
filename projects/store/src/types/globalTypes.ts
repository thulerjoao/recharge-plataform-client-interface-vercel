//=========== TYPES =============
export type DeviceType = "mobile" | "tablet" | "desktop";

//* User

export type UserType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  individualIdentification: IndividualIdentificationType;
};

export type IndividualIdentificationType = {
  type: string;
  value: string;
};

//* Product and packages

export type ProductType = {
  id: string;
  name: string;
  about: string;
  instructions: string;
  imgBannerUrl: string;
  imgCardUrl: string;
  packages: PackageType[];
};

export type PackageType = {
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

//=========== INTERFACES =============

export interface loginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}
