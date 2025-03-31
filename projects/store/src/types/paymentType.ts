export interface PixPaymentResponse {
  amount: number;
  paymentMethodName: string;
  urlQRCode: string;
  qrCode: string;
  qrCodetextCopyPaste: string;
}
