import CustomersPage from "./utils";
import { CustomerStatusFilter } from "types/customerType";

function parseOptionalNumber(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    status?: CustomerStatusFilter;
    daysWithoutPurchase?: string;
    minPurchases?: string;
    maxDaysWithoutPurchase?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));
  const search = searchParams.search?.trim() || "";
  const status = (searchParams.status as CustomerStatusFilter) || "all";
  const daysWithoutPurchase = parseOptionalNumber(
    searchParams.daysWithoutPurchase,
  );
  const minPurchases = parseOptionalNumber(searchParams.minPurchases);
  const maxDaysWithoutPurchase = parseOptionalNumber(
    searchParams.maxDaysWithoutPurchase,
  );

  const validStatuses: CustomerStatusFilter[] = ["all", "active", "excluded"];
  const validStatus = validStatuses.includes(status) ? status : "all";

  return (
    <CustomersPage
      currentPage={page}
      search={search}
      status={validStatus}
      daysWithoutPurchase={daysWithoutPurchase}
      minPurchases={minPurchases}
      maxDaysWithoutPurchase={maxDaysWithoutPurchase}
    />
  );
};

export default Page;
