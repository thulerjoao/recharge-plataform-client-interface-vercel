import Setttings from "./util";
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
      <Setttings />
    </Suspense>
  );
};

export default Page;
