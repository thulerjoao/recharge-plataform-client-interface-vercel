"use client";

import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { formatString } from "utils/formatString";
import { PackageType, ProductType } from "types/productTypes";

const ProductRedirect = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const coupon = searchParams.get("coupon");
  const { products } = useProducts();

  useEffect(() => {
    if (!packageId) {
      route.replace("/home");
      return;
    }
    if (!products || products.length === 0) {
      route.replace("/home");
      return;
    }
    const product = products.find((p: ProductType) =>
      p.packages.some((pkg: PackageType) => pkg.id === packageId),
    );
    if (!product) {
      route.replace("/home");
      return;
    }
    const slug = formatString(product.name);
    const url = `/product/${slug}/${packageId}${coupon ? `?coupon=${coupon}` : ""}`;
    route.replace(url);
  }, [packageId, coupon, products, route]);

  return (
    <div className="container">
      <span className="loading" />
    </div>
  );
};

const Page = () => (
  <Suspense
    fallback={
      <div className="container">
        <span className="loading" />
      </div>
    }
  >
    <ProductRedirect />
  </Suspense>
);

export default Page;
