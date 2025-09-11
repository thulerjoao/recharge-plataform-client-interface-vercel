import CouponSales from "./index";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  return <CouponSales influencerId={id} />;
};
export default Page;
