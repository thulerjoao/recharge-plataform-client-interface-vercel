import CustomersPage from "./utils";
import { CustomerStatusFilter } from "types/customerType";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    status?: CustomerStatusFilter;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));
  const search = searchParams.search?.trim() || "";
  const status = (searchParams.status as CustomerStatusFilter) || "all";

  const validStatuses: CustomerStatusFilter[] = ["all", "active", "excluded"];
  const validStatus = validStatuses.includes(status) ? status : "all";

  return (
    <CustomersPage currentPage={page} search={search} status={validStatus} />
  );
};

export default Page;
