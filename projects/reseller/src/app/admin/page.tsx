import AdmPage from "./util";
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
      <AdmPage />
    </Suspense>
  );
};

export default Page;
