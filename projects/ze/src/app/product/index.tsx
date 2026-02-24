"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import { useTheme } from "styled-components";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter, useSearchParams } from "next/navigation";
import LoginModal from "public/components/loginModal";
import { useEffect, useRef, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { scrollToTop } from "utils/scrollToTopFunction";
import PackageCardCompact from "public/cards/packageCardCompact/card";
import PaymentCard from "public/cards/paymentCard/card";
import { ProductContainer } from "./style";

const ProductPageContent = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");
  const coupon = searchParams.get("coupon");
  const slug = searchParams.get("slug");
  const { products } = useProducts();

  const theme = useTheme();
  const { logged } = useAuth();
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");

  const product = products?.find(
    (p: ProductType) => formatString(p.name) === slug,
  );
  const currentPackage: PackageType | undefined =
    product && product.packages[selected];

  useEffect(() => {
    if (packageId) {
      if (!products || products.length === 0) return;
      const productWithPackage = products.find((p: ProductType) =>
        p.packages.some((pkg: PackageType) => pkg.id === packageId),
      );
      if (!productWithPackage) {
        route.replace("/home");
        return;
      }
      const productSlug = formatString(productWithPackage.name);
      const url = `/product/${productSlug}?package=${packageId}${coupon ? `&coupon=${coupon}` : ""}`;
      route.replace(url);
      return;
    }
    if (!slug) {
      route.replace("/home");
    }
  }, [packageId, coupon, slug, products, route]);

  useEffect(() => {
    if (logged && clicked && currentPackage) handleOnClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged, clicked]);

  useEffect(() => {
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    sessionStorage.removeItem("orderId");
  }, []);

  useEffect(() => {
    setClicked(false);
  }, [userId]);

  const handleOnClick = () => {
    setClicked(true);
    if (!userId) {
      scrollToTop();
      setTimeout(() => {
        userIdInputRef.current?.focus();
      }, 500);
      return;
    }
    if (!logged) {
      return setLoginModal(true);
    }
    if (!product || !currentPackage) return;
    sessionStorage.setItem("paymentMethod", paymentMethod.toString());
    sessionStorage.setItem("userId", userId);
    route.push(
      `/product/${formatString(product.name)}?package=${currentPackage.id}`,
    );
  };

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

  if (!product) {
    route.replace("/home");
    return null;
  }

  return (
    <ProductContainer>
      <Text align="center" fontName="REGULAR_SEMI_BOLD">
        ID DE USUÁRIO
      </Text>
      <Input
        ref={userIdInputRef}
        placeholder="Insira seu ID de usuário"
        margin="16px 0 0 0"
        height={48}
        value={userId}
        onChange={(e) => setUserId(e.target.value.replace(/\s/g, ""))}
      />
      <Text
        tag="h2"
        margin="32px 0 0 0"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
      >
        PACOTE PARA RECARGA
      </Text>
      <section className="cardsContainer">
        {product.packages.map((item, index) => (
          <div
            key={item.id || index}
            className="cardEnviroment"
            onClick={() => setSelected(index)}
          >
            <PackageCardCompact item={item} selected={selected === index} />
          </div>
        ))}
      </section>
      <Text
        tag="h2"
        margin="32px 0 0 0"
        align="center"
        fontName="REGULAR_SEMI_BOLD"
      >
        FORMA DE PAGAMENTO
      </Text>
      <section className="paymentMethodsContainer">
        {currentPackage?.paymentMethods.map((item, index) => (
          <div
            key={item.id || index}
            className="paymentEnviroment"
            onClick={() => setPaymentMethod(index)}
          >
            <PaymentCard
              selected={paymentMethod === index}
              method={item.name}
              price={item.price}
            />
          </div>
        ))}
      </section>
      <Button
        onClick={() => handleOnClick()}
        margin="32px 0 80px 0"
        width={185}
        rounded
        height={40}
        title="Compre Agora"
      />
      {!userId && clicked && (
        <Text
          color={theme.pending}
          align="center"
          fontName="SMALL"
          margin="-64px 0 46px 0"
        >
          Insira o ID de usuário
        </Text>
      )}
      {loginModal && (
        <LoginModal openInNewAccount={false} setLoginModal={setLoginModal} />
      )}
    </ProductContainer>
  );
};

export default ProductPageContent;
