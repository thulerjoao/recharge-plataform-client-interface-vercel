import Influencer from ".";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const page = +params.slug;

  return <Influencer currentPage={page} />;
};
export default Page;
