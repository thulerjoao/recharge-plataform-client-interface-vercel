export interface OrderType {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  createdAt: string;
  payment: {
    name: string;
    status: PaymentStatus;
    statusUpdatedAt: string | null;
    qrCode: string;
    qrCodetextCopyPaste: string;
  };
  orderItem: {
    productId: string;
    productName: string;
    recharge: {
      userIdForRecharge: string;
      status: RechargeStatus;
      amountCredits: number;
      statusUpdatedAt: string | null;
    };
    package: {
      packageId: string;
      name: string;
      userIdForRecharge: string;
      imgCardUrl: string;
    };
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
