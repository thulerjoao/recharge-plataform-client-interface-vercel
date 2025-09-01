export interface CouponType {
  id: string;
  title: string;
  discountPercentage: string;
  discountAmount: string | null;
  expiresAt: string;
  timesUsed: number;
  totalSalesAmount: string;
  maxUses: number;
  minOrderAmount: string;
  isActive: boolean;
  storeId: string;
  createdAt: string;
  updatedAt: string;
  influencerId: string;
  isFirstPurchase: boolean;
}

export interface MonthlySalesType {
  id: string;
  influencerId: string;
  month: number;
  year: number;
  totalSales: string;
  createdAt: string;
  updatedAt: string;
}

export interface InfluencerType {
  id: string;
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentData: string;
  isActive: boolean;
  storeId: string;
  coupons: CouponType[];
  monthlySales: MonthlySalesType[];
  createdAt: string;
  updatedAt: string;
}

export interface InfluencerResponseType {
  data: InfluencerType[];
  totalInfluencers: number;
  page: number;
  totalPages: number;
}
