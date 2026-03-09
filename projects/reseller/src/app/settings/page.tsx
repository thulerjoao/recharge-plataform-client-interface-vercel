import Settings from "./util";
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
      <Settings />
    </Suspense>
  );
};

export default Page;
