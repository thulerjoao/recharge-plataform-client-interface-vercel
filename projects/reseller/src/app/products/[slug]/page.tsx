"use client";

import Productpage from ".";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return <Productpage slug={params.slug} />;
};
export default Page;
