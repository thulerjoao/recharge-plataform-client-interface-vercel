"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProducts } from "contexts/products/ProductsProvider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { DescriptionContainer } from "./style";
import Image from "next/image";

const Description = () => {
  const products = useProducts();
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const pathname = usePathname();
  const getProductname = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length >= 2 ? segments[1] : null;
  };

  const productName = getProductname();
  const product = products.find(
    (item: ProductType) => formatString(item.name) === productName,
  );

  return (
    <DescriptionContainer>
      <Image
        src={product.imgBannerUrl}
        alt={`Imagem do pacote ${product.name}`}
        height={600}
        width={1000}
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
              color={Theme.colors.secondaryText}
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
            color={Theme.colors.secondaryText}
            fontName="REGULAR_SEMI_BOLD"
          >
            Instruções
          </Text>
          <Text margin="24px 0 0 0 " fontName="REGULAR">
            {product.instructions}
          </Text>
        </div>
        <div className="instructions">
          <Text
            margin="24px 0 0 0 "
            color={Theme.colors.secondaryText}
            fontName="REGULAR_SEMI_BOLD"
          >
            Sobre {product.name}
          </Text>
          <Text margin="24px 0 0 0 " fontName="REGULAR">
            {product.description}
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
            color={Theme.colors.secondaryText}
          >
            ver menos
          </Text>
        </div>
      </div>
    </DescriptionContainer>
  );
};

export default Description;
