"use client";

import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";

import { ProductContainer } from "./style";
import PackageBigoCard from "public/cards/packageBigoCardCompact/card";
import PackagePoppoCard from "public/cards/packagePoppoCardCompact/card";

const ProductPageContent = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const coupon = searchParams.get("coupon");
  const slug = searchParams.get("slug");
  const { products } = useProducts();
  const theme = useTheme();

  useEffect(() => {
    if (!packageId) {
      if (!slug) {
        route.replace("/home");
      }
      return;
    }

    if (!products || products.length === 0) return;

    const productWithPackage = products.find((p: ProductType) =>
      p.packages.some((pkg) => pkg.id === packageId),
    );

    if (!productWithPackage) {
      route.replace("/home");
      return;
    }

    const productSlug = formatString(productWithPackage.name);
    const url = `/product/${productSlug}?package=${packageId}${
      coupon ? `&coupon=${coupon}` : ""
    }`;
    route.replace(url);
  }, [packageId, coupon, slug, products, route]);

  if (packageId) {
    return (
      <div className="container">
        <span className="loading" />
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="container">
        <span className="loading" />
      </div>
    );
  }

  if (!products) {
    return (
      <ProductContainer>
        <Text
          color={theme.pending}
          align="center"
          fontName="SMALL"
          margin="32px 0 48px 0"
        >
          Carregando...
        </Text>
      </ProductContainer>
    );
  }

  const product = products.find(
    (p: ProductType) => formatString(p.name) === slug,
  );

  if (!product) {
    route.replace("/home");
    return null;
  }

  const productSlug = formatString(product.name);

  const handleSelectPackage = (id?: string) => {
    if (!id) return;
    route.push(`/product/${productSlug}?package=${id}`);
  };

  return (
    <ProductContainer>
      <Text
        tag="h2"
        margin="8px 0 0 0"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
      >
        Escolha o pacote que melhor te atende!
      </Text>
      <section className="cardsContainer">
        {product.packages.map((item, index) => (
          <div
            key={item.id || index}
            className="cardEnviroment"
            onClick={() => handleSelectPackage(item.id)}
          >
            {slug === "Bigo_Live" ? (
              <PackageBigoCard item={item} selected={false} />
            ) : (
              <PackagePoppoCard item={item} selected={false} />
            )}
          </div>
        ))}
      </section>
    </ProductContainer>
  );
};

export default ProductPageContent;
