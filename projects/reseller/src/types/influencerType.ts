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
export interface MonthlySalesPaginationType {
  data: MonthlySalesType[];
  totalSales: number;
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
  monthlyCoupons: MonthlyCouponsType[];
  createdAt: string;
  updatedAt: string;
}

export interface InfluencerResponseType {
  data: InfluencerType[];
  totalInfluencers: number;
  page: number;
  totalPages: number;
}
