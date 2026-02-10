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
        minOrderAmount?: number;
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
        | "Failed to validate coupon"
        | "This coupon can only be used once per bigoId";
    };

export type FeaturedCoupon = {
  id: string;
  title: string;
  influencerId: string;
  discountPercentage: string;
  discountAmount: string | null;
  expiresAt: string | null;
  timesUsed: number;
  totalSalesAmount: string;
  maxUses: number | null;
  minOrderAmount: string;
  isActive: boolean;
  isFirstPurchase: boolean;
  storeId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  influencer: {
    id: string;
    name: string;
    email: string;
  };
  featuredAt: string;
};
