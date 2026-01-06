import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { SalesByProductType } from "types/dashboardTypes";
import { formatPrice } from "utils/formatPrice";
import { SalesByProductContainer } from "./style";

interface SalesByProductProps {
  salesByProduct: SalesByProductType[];
}

const SalesByProduct = ({ salesByProduct }: SalesByProductProps) => {
  if (!salesByProduct || salesByProduct.length === 0) {
    return (
      <SalesByProductContainer>
        <Text fontName="LARGE_SEMI_BOLD" margin="0 0 24px 0">
          Vendas por Produto
        </Text>
        <Text fontName="REGULAR" color="#999">
          Nenhum dado disponível
        </Text>
      </SalesByProductContainer>
    );
  }

  return (
    <SalesByProductContainer>
      <Text fontName="LARGE_SEMI_BOLD" margin="0 0 24px 0">
        Vendas por Produto
      </Text>
      {salesByProduct.map((product) => (
        <div key={product.productId} className="productCard">
          {product.imgCardUrl && (
            <Image
              src={product.imgCardUrl || ""}
              alt={product.productName}
              width={64}
              height={64}
              className="productImage"
            />
          )}
          <div className="productInfo">
            <Text fontName="REGULAR_MEDIUM">{product.productName}</Text>
            <Text margin="4px 0 0 0" fontName="SMALL" color="#999">
              {product.percentage.toFixed(1)}% do total
            </Text>
          </div>
          <div className="productMetrics">
            <div className="metric">
              <Text fontName="REGULAR" color="#999">
                Vendas
              </Text>
              <Text margin="4px 0 0 0" fontName="REGULAR_MEDIUM">
                R$ {formatPrice(product.totalSales)}
              </Text>
            </div>
            <div className="metric">
              <Text fontName="REGULAR" color="#999">
                Pedidos
              </Text>
              <Text margin="4px 0 0 0" fontName="REGULAR_MEDIUM">
                {product.totalOrders}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </SalesByProductContainer>
  );
};

export default SalesByProduct;
