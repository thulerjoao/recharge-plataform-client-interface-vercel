export interface OrderType {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  paymentStatus: "PAYMENT_PENDING" | "PAYMENT_APPROVED" | "PAYMENT_REJECTED";
  rechargeStatus:
    | "RECHARGE_PENDING"
    | "RECHARGE_APPROVED"
    | "RECHARGE_REJECTED";
  paymentMethodName: string;
  createdAt: string;
  package: {
    name: string;
    userIdForRecharge: string;
    amountCredits: number;
    imgCardUrl: string;
  };
}
