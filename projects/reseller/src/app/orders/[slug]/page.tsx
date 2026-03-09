import OrdersInnerPage from ".";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
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
      <OrdersInnerPage slug={params.slug} />
    </Suspense>
  );
};

export default Page;
