import Influencer from ".";

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
  const page = +params.slug;
  const search = searchParams.search || "";
  const status = searchParams.status || "all";

  return <Influencer currentPage={page} search={search} status={status} />;
};
export default Page;
