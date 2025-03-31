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
  id: string;
  name: string;
  amountCredits: number;
  imgCardUrl: string;
  isOffer: boolean;
  baseCost: number;
  paymentMethods: PaymentMethodsType[];
};

export type PaymentMethodsType = {
  name:
    | "pix"
    | "mercado pago"
    | "picpay"
    | "paypal"
    | "boleto"
    | "transferencia";
  price: number;
};
