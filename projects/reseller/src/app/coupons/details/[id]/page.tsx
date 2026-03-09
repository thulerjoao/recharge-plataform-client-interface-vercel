import CouponDetails from ".";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
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
      <CouponDetails couponId={params.id} />
    </Suspense>
  );
};

export default Page;
