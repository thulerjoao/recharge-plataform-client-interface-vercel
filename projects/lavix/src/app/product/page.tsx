import PaymentPage from "./index";

type Props = {
  searchParams: {
    package: string;
    coupon?: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  const packageId = searchParams.package;
  const coupon = searchParams.coupon;
  return <PaymentPage packageId={packageId} couponFromParams={coupon} />;
};
export default Page;
