import CreateInfluencer from ".";
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
      <CreateInfluencer />
    </Suspense>
  );
};

export default Page;
