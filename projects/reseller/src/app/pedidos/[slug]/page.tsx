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
  const status = (searchParams.status as string) || undefined;

  // Validação de status
  // const validStatuses = ["all", "active", "inactive"];
  // const validStatus = validStatuses.includes(status) ? status : "all";

  return <OrdersPage currentPage={page} search={search} status={status} />;
};
export default Page;
