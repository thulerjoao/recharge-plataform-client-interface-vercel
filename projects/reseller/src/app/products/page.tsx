import ProductsPage from "./util";
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
      <ProductsPage />
    </Suspense>
  );
};

export default Page;
