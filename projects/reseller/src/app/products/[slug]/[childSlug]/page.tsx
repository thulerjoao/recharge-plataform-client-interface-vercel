"use client";

import SecondaryProductPage from ".";

type Props = {
  params: {
    slug: string;
    childSlug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <SecondaryProductPage slug={params.slug} childSlug={params.childSlug} />
  );
};
export default Page;
