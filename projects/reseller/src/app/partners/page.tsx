import PartnersPage from ".";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    status?: "all" | "active" | "inactive";
  };
};

const Page = ({ searchParams }: Props) => {
  // Validar e processar página
  const page = Math.max(1, +(searchParams.page || "1"));

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
