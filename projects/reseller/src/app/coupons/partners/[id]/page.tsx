import CouponSales from "./index";
import { Suspense } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <CouponSales influencerId={id} />
    </Suspense>
  );
};

export default Page;
