export interface OrderType {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  rechargeStatus: RechargeStatus;
  paymentMethodName: string;
  createdAt: string;
  package: {
    name: string;
    userIdForRecharge: string;
    amountCredits: number;
    imgCardUrl: string;
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
