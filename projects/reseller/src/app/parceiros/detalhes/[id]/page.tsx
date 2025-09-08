import { useInfluencers } from "context/influencers";
import InfluencerDetails from "./index";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  return <InfluencerDetails influencerId={id} />;
};
export default Page;
