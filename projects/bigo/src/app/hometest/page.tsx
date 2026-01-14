import HomeTest from "./util/hometest";

type Props = {
  searchParams: {
    coupon?: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  const coupon = searchParams.coupon;
  return <HomeTest coupon={coupon} />;
};
export default Page;
