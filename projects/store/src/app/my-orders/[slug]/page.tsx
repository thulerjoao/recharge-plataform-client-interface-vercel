import MyOrders from ".";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const page = +params.slug;

  return <MyOrders currentPage={page} />;
};
export default Page;
