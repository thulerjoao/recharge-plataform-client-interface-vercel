import PartnersPage from ".";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search?: string;
    status?: "all" | "active" | "inactive";
  };
};

const Page = ({ params, searchParams }: Props) => {
  // Validar e processar página
  const page = Math.max(1, +params.slug || 1);

  // Processar filtros
  const search = searchParams.search?.trim() || "";
  const status =
    (searchParams.status as "all" | "active" | "inactive") || "all";

  // Validação de status
  const validStatuses = ["all", "active", "inactive"];
  const validStatus = validStatuses.includes(status) ? status : "all";

  return (
    <PartnersPage currentPage={page} search={search} status={validStatus} />
  );
};
export default Page;
