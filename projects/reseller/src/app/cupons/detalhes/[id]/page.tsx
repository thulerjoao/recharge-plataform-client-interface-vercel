import CouponDetails from ".";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return <CouponDetails couponId={params.id} />;
};

export default Page;
