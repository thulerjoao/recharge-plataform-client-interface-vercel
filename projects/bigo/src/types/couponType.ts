export type CouponValidationResponse =
  | {
      valid: true;
      discountAmount: number;
      finalAmount: number;
      coupon: {
        id: string;
        title: string;
        discountPercentage: number | null;
        discountAmount: number | null;
        isFirstPurchase: boolean;
      };
    }
  | {
      valid: false;
      message:
        | "Coupon not found"
        | "Coupon is not active"
        | "Coupon has expired"
        | "Coupon usage limit reached"
        | `Minimum order amount required: ${number}`
        | "First purchase coupon can only be used by new customers"
        | "Failed to validate coupon";
    };
