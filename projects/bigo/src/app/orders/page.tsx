import MyOrders from ".";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));

  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <MyOrders currentPage={page} />
    </Suspense>
  );
};

export default Page;
