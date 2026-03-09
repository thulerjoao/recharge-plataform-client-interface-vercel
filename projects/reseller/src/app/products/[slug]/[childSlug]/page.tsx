import SecondaryProductPage from ".";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
    childSlug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <SecondaryProductPage slug={params.slug} childSlug={params.childSlug} />
    </Suspense>
  );
};

export default Page;
