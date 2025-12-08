import Home from "./util/home";

type Props = {
  searchParams: {
    coupon?: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  const coupon = searchParams.coupon;
  return <Home coupon={coupon} />;
};
export default Page;
