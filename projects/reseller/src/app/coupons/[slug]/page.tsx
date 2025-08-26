import Coupons from ".";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const page = +params.slug;

  return <Coupons currentPage={page} />;
};

export default Page;
