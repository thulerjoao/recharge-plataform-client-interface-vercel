import InfluencerSales from "./index";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  return <InfluencerSales influencerId={id} />;
};
export default Page;
