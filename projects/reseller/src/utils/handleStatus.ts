import { Theme } from "@4miga/design-system/theme/theme";
import { OrderStatus, PaymentStatus, RechargeStatus } from "types/orderType";

export const handlePaymentStatus = (status: PaymentStatus) => {
  if (status === "PAYMENT_APPROVED") {
    return "Pagamento aprovado";
  } else if (status === "PAYMENT_PENDING") {
    return "Pendente";
  } else if (status === "PAYMENT_REJECTED") {
    return "Pagamento cancelado";
  }
};

// export const handlePaymentStatusShort = (status: PaymentStatus) => {
//   if (status === "PAYMENT_APPROVED") {
//     return "Aprovado";
//   } else if (status === "PAYMENT_PENDING") {
//     return "Pendente";
//   } else if (status === "PAYMENT_REJECTED") {
//     return "Cancelado";
//   }
// };

export const handleOrderStatus = (status: OrderStatus) => {
  if (status === "CREATED") {
    return "Pendente";
  } else if (status === "PROCESSING") {
    return "Processando";
  } else if (status === "EXPIRED") {
    return "Expirado";
  } else if (status === "COMPLETED") {
    return "Finalizado";
  } else if (status === "REFOUNDED") {
    return "Extornado";
  } else {
    return "Pendente";
  }
};

export const handleRechargeStatus = (status: RechargeStatus) => {
  if (status === "RECHARGE_APPROVED") {
    return "Recarga realizada";
  } else if (status === "RECHARGE_PENDING") {
    return "Recarga em andamento";
  } else if (status === "RECHARGE_REJECTED") {
    return "Recarga realizada";
  }
};

export const handleStatusColor = (
  status: PaymentStatus | RechargeStatus | OrderStatus,
) => {
  if (
    //PaymentStatus
    status === "PAYMENT_APPROVED" ||
    //RechargeStatus
    status === "RECHARGE_APPROVED" ||
    //OrderStatus
    status === "PROCESSING" ||
    status === "REFOUNDED" ||
    status === "COMPLETED"
  ) {
    return Theme.colors.approved;
  } else if (
    //PaymentStatus
    status === "PAYMENT_PENDING" ||
    //RechargeStatus
    status === "RECHARGE_PENDING" ||
    //OrderStatus
    status === "CREATED"
  ) {
    return Theme.colors.pending;
  } else if (
    //PaymentStatus
    status === "PAYMENT_REJECTED" ||
    //RechargeStatus
    status === "RECHARGE_REJECTED" ||
    //OrderStatus
    status === "EXPIRED"
  ) {
    return Theme.colors.refused;
  }
};
