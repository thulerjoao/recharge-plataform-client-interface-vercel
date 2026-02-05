import CustomerOrdersPage from ".";

type Props = {
  searchParams: {
    page?: string;
    email?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));
  const email = searchParams.email?.trim() || "";

  return <CustomerOrdersPage currentPage={page} customerEmail={email} />;
};

export default Page;
