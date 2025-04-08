import { Theme } from "@4miga/design-system/theme/theme";
import { PaymentStatus, RechargeStatus } from "types/orderType";

export const handlePaymentStatus = (status: PaymentStatus) => {
  if (status === "PAYMENT_APPROVED") {
    return "Pagamento aprovado";
  } else if (status === "PAYMENT_PENDING") {
    return "Aguardando pagamento";
  } else if (status === "PAYMENT_REJECTED") {
    return "Pagamento cancelado";
  }
};

export const handlePaymentStatusShort = (status: PaymentStatus) => {
  if (status === "PAYMENT_APPROVED") {
    return "Aprovado";
  } else if (status === "PAYMENT_PENDING") {
    return "Pendente";
  } else if (status === "PAYMENT_REJECTED") {
    return "Cancelado";
  }
};

export const handleRechargeStatus = (status: RechargeStatus) => {
  if (status === "RECHARGE_APPROVED") {
    return "Recarga realizada";
  } else if (status === "RECHARGE_PENDING") {
    return "Recarga pendente";
  } else if (status === "RECHARGE_REJECTED") {
    return "Recarga realizada";
  }
};

export const handleStatusColor = (status: PaymentStatus | RechargeStatus) => {
  if (status === "PAYMENT_APPROVED" || status === "RECHARGE_APPROVED") {
    return Theme.colors.approved;
  } else if (status === "PAYMENT_PENDING" || status === "RECHARGE_PENDING") {
    return Theme.colors.pending;
  } else if (status === "PAYMENT_REJECTED" || status === "RECHARGE_REJECTED") {
    return Theme.colors.refused;
  }
};
