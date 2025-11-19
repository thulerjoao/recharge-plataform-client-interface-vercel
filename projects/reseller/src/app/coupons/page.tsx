import CouponsPage from ".";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    status?: "all" | "active" | "inactive";
    type?: "all" | "percentage" | "fixed" | "first-purchase";
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));
  const search = searchParams.search?.trim() || "";
  const status =
    (searchParams.status as "all" | "active" | "inactive") || "all";
  const type =
    (searchParams.type as "all" | "percentage" | "fixed" | "first-purchase") ||
    "all";

  const validStatuses = ["all", "active", "inactive"];
  const validStatus = validStatuses.includes(status) ? status : "all";

  const validTypes = ["all", "percentage", "fixed", "first-purchase"];
  const validType = validTypes.includes(type) ? type : "all";

  return (
    <CouponsPage
      currentPage={page}
      search={search}
      status={validStatus}
      type={validType}
    />
  );
};

export default Page;
