"use client";

import { OrderStatus } from "types/orderType";
import OrdersPage from "./index";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    productId?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  // Validar e processar página
  const page = Math.max(1, +(searchParams.page || "1"));

  // Processar filtros
  const search = searchParams.search?.trim() || "";
  const status = (searchParams.status as OrderStatus) || undefined;
  const productId = searchParams.productId?.trim() || "";

  // Validação de status
  const validStatuses = ["processing", "completed", "expired", "refunded"];
  const validStatus = validStatuses.includes(status) ? status : undefined;

  return (
    <OrdersPage
      currentPage={page}
      search={search}
      status={validStatus}
      productId={productId}
    />
  );
};

export default Page;
