import { CouponType } from "./couponType";

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
  email: string | null;
  phone: string | null;
  paymentMethod: string | null;
  paymentData: string | null;
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
