import InfluencerCoupons from ".";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return <InfluencerCoupons influencerId={params.id} />;
};

export default Page;
