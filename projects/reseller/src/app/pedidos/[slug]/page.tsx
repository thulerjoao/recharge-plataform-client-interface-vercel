import { OrderStatus } from "types/orderType";
import OrdersPage from ".";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search?: string;
    status?: string;
  };
};

const Page = ({ params, searchParams }: Props) => {
  // Validar e processar página
  const page = Math.max(1, +params.slug || 1);

  // Processar filtros
  const search = searchParams.search?.trim() || "";
  const status = (searchParams.status as OrderStatus) || undefined;

  // Validação de status
  const validStatuses = ["processing", "completed", "expired", "refunded"];
  const validStatus = validStatuses.includes(status) ? status : undefined;

  return <OrdersPage currentPage={page} search={search} status={validStatus} />;
};
export default Page;
