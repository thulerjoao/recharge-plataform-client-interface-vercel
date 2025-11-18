export type PeriodType = {
  type: string;
  year: number;
  month: number;
  startDate: string;
  endDate: string;
};

export type DashboardSummaryType = {
  totalSales: number;
  totalOrders: number;
  totalCompletedOrders: number;
  totalExpiredOrders: number;
  totalRefundedOrders: number;
  averageTicket: number;
  totalCustomers: number;
  newCustomers: number;
  ordersWithCoupon: number;
  ordersWithoutCoupon: number;
};

export type DailyTrendType = {
  date: string;
  totalSales: number;
  totalOrders: number;
};

export type SalesByProductType = {
  productId: string;
  productName: string;
  imgCardUrl: string;
  totalSales: number;
  totalOrders: number;
  percentage: number;
};

export type FirstAvailablePeriodType = {
  year: number;
  month: number;
  period: string;
};

export type DashboardDataType = {
  period: PeriodType;
  summary: DashboardSummaryType;
  dailyTrend: DailyTrendType[];
  salesByProduct: SalesByProductType[];
  firstAvailablePeriod: FirstAvailablePeriodType;
};

