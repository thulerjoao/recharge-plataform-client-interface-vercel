import { OrderStatus, PaymentStatus, RechargeStatus } from "./orderType";

export interface PixPaymentResponse {
  id: string;
  orderItem: OrderItem;
  orderItemId: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  payment: Payment;
  paymentId: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interfaces
export interface PackageInfo {
  id: string;
  packageId: string;
  name: string;
  userIdForRecharge: string;
  imgCardUrl: string;
}

export interface Recharge {
  id: string;
  userIdForRecharge: string;
  status: RechargeStatus;
  amountCredits: number;
  statusUpdatedAt: Date | null;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  rechargeId: string;
  packageId: string;
  package: PackageInfo;
  recharge: Recharge;
}

export interface Payment {
  id: string;
  name: string;
  status: PaymentStatus;
  statusUpdatedAt: Date | null;
  qrCode: string | null;
  qrCodetextCopyPaste: string | null;
  externalId: string | null;
  paymentProvider: string | null;
}
