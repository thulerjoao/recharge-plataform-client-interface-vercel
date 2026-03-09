import PaymentPage from "./index";
import { Suspense } from "react";

type Props = {
  searchParams: {
    package?: string;
    coupon?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const packageId = searchParams.package || "";
  const coupon = searchParams.coupon;

  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <PaymentPage packageId={packageId} couponFromParams={coupon} />
    </Suspense>
  );
};

export default Page;
