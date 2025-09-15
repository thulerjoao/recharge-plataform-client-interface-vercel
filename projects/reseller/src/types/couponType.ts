export interface CouponType {
  id: string;
  title: string;
  discountPercentage: number;
  discountAmount: number;
  expiresAt: string;
  timesUsed: number;
  totalSalesAmount: string;
  maxUses: number;
  minOrderAmount: number;
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
