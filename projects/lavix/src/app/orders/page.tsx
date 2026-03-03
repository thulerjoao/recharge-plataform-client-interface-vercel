import MyOrders from ".";

type Props = {
  searchParams: {
    page?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));

  return <MyOrders currentPage={page} />;
};
export default Page;
