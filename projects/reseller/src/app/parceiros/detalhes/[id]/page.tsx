import InfluencerDetails from "./index";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return <InfluencerDetails influencerId={params.id} />;
};
export default Page;
