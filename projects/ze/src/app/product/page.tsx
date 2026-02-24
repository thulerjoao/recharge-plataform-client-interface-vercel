import ProductPageContent from ".";
import { Suspense } from "react";

const Page = () => (
  <Suspense
    fallback={
      <div className="container">
        <span className="loading" />
      </div>
    }
  >
    <ProductPageContent />
  </Suspense>
);

export default Page;
