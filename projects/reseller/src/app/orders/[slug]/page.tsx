import OrdersInnerPage from ".";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return <OrdersInnerPage slug={params.slug} />;
};

export default Page;
