export type ProductType = {
  id: string;
  name: string;
  description: string;
  instructions: string;
  imgBannerUrl: string;
  imgCardUrl: string;
  packages: PackageType[];
  storeCustomization: StoreCustomizationType | null;
};

export type PackageType = {
  id: string;
  name: string;
  amountCredits: number;
  imgCardUrl: string;
  isActive: boolean;
  isOffer: boolean;
  basePrice: string;
  storeId: string;
  paymentMethods: PaymentMethodsType[];
};

export type PaymentMethodsType = {
  id: string;
  name:
    | "pix"
    | "mercado pago"
    | "picpay"
    | "paypal"
    | "boleto"
    | "transferencia";
  price: number;
};

export type StoreCustomizationType = {
  description: string;
  instructions: string;
  imgBannerUrl: string;
  imgCardUrl: string;
};
