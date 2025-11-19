import CreateCoupon from ".";

type Props = {
  params: { influencerId?: string };
};

const Page = ({ params }: Props) => {
  return <CreateCoupon initialInfluencerId={params.influencerId} />;
};

export default Page;
