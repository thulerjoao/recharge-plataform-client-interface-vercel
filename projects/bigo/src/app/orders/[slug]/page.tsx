import Order from ".";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="container">
          <span className="loading" />
        </div>
      }
    >
      <Order />
    </Suspense>
  );
};

export default Page;
