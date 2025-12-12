import { UserType } from "./userTypes";

export interface OrderType {
  couponUsages: {
    coupon: {
      discountAmount?: string | number;
      discountPercentage?: string | number;
      id: string;
      isFirstPurchase: boolean;
      title: string;
    };
    couponId: string;
    id: string;
    orderId: string;
    usedAt: string;
  }[];
  createdAt: string;
  id: string;
  orderItem: {
    id: string;
    package: {
      id: string;
      imgCardUrl: string;
      name: string;
      packageId: string;
      userIdForRecharge: string;
    };
    packageId: string;
    productId: string;
    productName: string;
    recharge: {
      amountCredits: number;
      id: string;
      status: RechargeStatus;
      statusUpdatedAt: string;
      userIdForRecharge: string;
    };
    rechargeId: string;
  };
  orderItemId: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  payment: {
    externalId: string;
    id: string;
    name: string;
    paymentProvider: string;
    qrCode: string;
    qrCodetextCopyPaste: string;
    status: PaymentStatus;
    statusUpdatedAt: string;
  };
  paymentId: string;
  price: number;
  basePrice: number;
  storeId: string;
  updatedAt: Date;
  user: UserType;
  userId: string;
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
