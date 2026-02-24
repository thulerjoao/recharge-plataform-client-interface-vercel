import ProductSlugPage from ".";
import { Suspense } from "react";

const Page = () => (
  <Suspense
    fallback={
      <div className="container">
        <span className="loading" />
      </div>
    }
  >
    <ProductSlugPage />
  </Suspense>
);

export default Page;
