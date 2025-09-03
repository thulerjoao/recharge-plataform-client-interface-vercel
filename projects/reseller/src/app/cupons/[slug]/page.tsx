import Coupons from ".";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search?: string;
    status?: "all" | "active" | "inactive";
    type?: "all" | "percentage" | "fixed" | "first-purchase";
  };
};

const Page = ({ params, searchParams }: Props) => {
  // Validar e processar página
  const page = Math.max(1, +params.slug || 1);

  // Processar filtros
  const search = searchParams.search?.trim() || "";
  const status =
    (searchParams.status as "all" | "active" | "inactive") || "all";
  const type =
    (searchParams.type as "all" | "percentage" | "fixed" | "first-purchase") ||
    "all";

  // Validação de status
  const validStatuses = ["all", "active", "inactive"];
  const validStatus = validStatuses.includes(status) ? status : "all";

  // Validação de tipo
  const validTypes = ["all", "percentage", "fixed", "first-purchase"];
  const validType = validTypes.includes(type) ? type : "all";

  return (
    <Coupons
      currentPage={page}
      search={search}
      status={validStatus}
      type={validType}
    />
  );
};

export default Page;
