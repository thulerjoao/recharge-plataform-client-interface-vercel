import CustomerOrdersPage from ".";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: string;
    email?: string;
  };
};

const Page = ({ searchParams }: Props) => {
  const page = Math.max(1, +(searchParams.page || "1"));
  const email = searchParams.email?.trim() || "";

  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <CustomerOrdersPage currentPage={page} customerEmail={email} />
    </Suspense>
  );
};

export default Page;
