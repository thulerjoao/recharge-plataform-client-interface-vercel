import CreateCoupon from ".";
import { Suspense } from "react";

type Props = {
  params: { influencerId?: string };
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
      <CreateCoupon initialInfluencerId={params.influencerId} />
    </Suspense>
  );
};

export default Page;
