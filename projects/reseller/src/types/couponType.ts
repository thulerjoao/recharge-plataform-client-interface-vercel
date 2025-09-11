export interface CouponType {
  id: string;
  title: string;
  discountPercentage: string | null;
  discountAmount: string | null;
  expiresAt: string | null;
  timesUsed: number;
  totalSalesAmount: string;
  maxUses: number | null;
  minOrderAmount: string | null;
  isActive: boolean;
  storeId: string;
  createdAt: string;
  updatedAt: string;
  influencerId: string;
  isFirstPurchase: boolean;
  influencer: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CouponResponseType {
  data: CouponType[];
  totalCoupons: number;
  page: number;
  totalPages: number;
  influencerName: string;
}

export interface MonthlyCouponsType {
  id: string;
  influencerId: string;
  month: number;
  year: number;
  totalCoupons: number;
  createdAt: string;
  updatedAt: string;
}
