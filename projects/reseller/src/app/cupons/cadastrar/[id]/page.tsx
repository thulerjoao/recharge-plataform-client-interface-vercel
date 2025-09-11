import CreateCoupon from ".";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  return <CreateCoupon influencerId={params.id} />;
};

export default Page;
