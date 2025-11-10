export interface OrderType {
  id: string;
  orderNumber: string;
  price: number;
  orderStatus: OrderStatus;
  paymentId: string;
  orderItemId: string;
  createdAt: string;
  updatedAt: string;
  storeId: string;
  userId: string;
  payment: {
    id: string;
    name: string;
    status: PaymentStatus;
    statusUpdatedAt: string | null;
    qrCode?: string;
    qrCodetextCopyPaste?: string;
  };
  orderItem: {
    id: string;
    productId: string;
    productName: string;
    rechargeId: string;
    packageId: string;
    recharge: {
      id: string;
      userIdForRecharge: string;
      status: RechargeStatus;
      amountCredits: number;
      statusUpdatedAt: string | null;
    };
    package: {
      id: string;
      packageId: string;
      name: string;
      userIdForRecharge: string;
      imgCardUrl: string;
    };
    couponUsages: string[];
  };
}

export type PaymentStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_APPROVED"
  | "PAYMENT_REJECTED";

export type RechargeStatus =
  | "RECHARGE_PENDING"
  | "RECHARGE_APPROVED"
  | "RECHARGE_REJECTED";

export type OrderStatus =
  | "CREATED"
  | "PROCESSING"
  | "COMPLETED"
  | "EXPIRED"
  | "REFOUNDED";

export interface OrderResponseType {
  data: OrderType[];
  totalOrders: number;
  page: number;
  totalPages: number;
}
