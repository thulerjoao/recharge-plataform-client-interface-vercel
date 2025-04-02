export interface PixPaymentResponse {
  orderId: string;
  orderNumber: string;
  userIdForRecharge: string;
  amount: number;
  paymentMethodName: string;
  urlQRCode: string;
  qrCode: string;
  qrCodetextCopyPaste: string;
}
