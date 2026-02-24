"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "contexts/products/ProductsProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTheme } from "styled-components";
import { formatString } from "utils/formatString";
import { DescriptionContainer } from "./style";
import Image from "next/image";

const Description = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { products } = useProducts();
  const slugFromPath = pathname.split("/")[2];
  const slugFromQuery = searchParams.get("slug");
  const slug =
    pathname === "/product" && slugFromQuery ? slugFromQuery : slugFromPath;
  const product = products?.find((p) => formatString(p.name) === slug) ?? null;
  const [seeMore, setSeeMore] = useState<boolean>(false);

  if (!product) return null;

  return (
    <DescriptionContainer>
      <Image
        src={product.storeCustomization?.imgBannerUrl || product.imgBannerUrl}
        alt={`Imagem do pacote ${product.name}`}
        height={600}
        width={1000}
        priority
        loading="eager"
        sizes="100vw"
        quality={85}
      />
      <div className="centerContent">
        <Text margin="24px 0 0 0 " fontName="BIG_SEMI_BOLD">
          {product.name.toUpperCase()}
        </Text>
        {!seeMore && (
          <div
            className="seeMore"
            style={{ cursor: "pointer" }}
            onClick={() => setSeeMore(true)}
          >
            <Text
              margin="8px 0 0 0"
              underline
              fontName="REGULAR"
              color={theme.text_03}
            >
              ver mais informações
            </Text>
          </div>
        )}
      </div>
      <div className={`centerContent ${!seeMore && "hiddenContent"}`}>
        <div className="instructions">
          <Text
            margin="24px 0 0 0 "
            color={theme.text_03}
            fontName="REGULAR_SEMI_BOLD"
          >
            Instruções
          </Text>
          <Text margin="24px 0 0 0 " fontName="REGULAR">
            {product.storeCustomization?.instructions || product.instructions}
          </Text>
        </div>
        <div className="instructions">
          <Text
            margin="24px 0 0 0 "
            color={theme.text_03}
            fontName="REGULAR_SEMI_BOLD"
          >
            Sobre {product.name}
          </Text>
          <Text margin="24px 0 0 0 " fontName="REGULAR">
            {product.storeCustomization?.description || product.description}
          </Text>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setSeeMore(false)}
          className="seeLess"
        >
          <Text
            margin="24px 0 0 0"
            underline
            fontName="REGULAR"
            align="center"
            color={theme.text_03}
          >
            ver menos
          </Text>
        </div>
      </div>
    </DescriptionContainer>
  );
};

export default Description;
