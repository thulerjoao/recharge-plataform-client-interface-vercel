import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useState } from "react";
import { SalesByPackageType } from "types/dashboardTypes";
import { formatPrice } from "utils/formatPrice";
import { SalesByPackageContainer } from "./style";

const INITIAL_DISPLAY_COUNT = 5;

interface SalesByPackageProps {
  salesByPackage: SalesByPackageType[];
}

const SalesByPackage = ({ salesByPackage }: SalesByPackageProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!salesByPackage || salesByPackage.length === 0) {
    return (
      <SalesByPackageContainer>
        <Text fontName="LARGE_SEMI_BOLD" margin="0 0 24px 0">
          Pacotes mais vendidos
        </Text>
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Nenhum dado disponível
        </Text>
      </SalesByPackageContainer>
    );
  }

  const displayList = expanded
    ? salesByPackage
    : salesByPackage.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = salesByPackage.length > INITIAL_DISPLAY_COUNT;

  return (
    <SalesByPackageContainer>
      <Text fontName="LARGE_SEMI_BOLD" margin="0 0 24px 0">
        Pacotes mais vendidos
      </Text>
      <ul className="packageList">
        {displayList.map((pkg, index) => (
          <li key={pkg.packageId} className="packageItem">
            <Text fontName="REGULAR_MEDIUM" className="packageName">
              {index + 1} - {pkg.packageName}
            </Text>
            <div className="packageMetrics">
              <Text
                nowrap
                fontName="REGULAR"
                color={Theme.colors.secondaryTextAction}
                align="start"
              >
                {pkg.totalOrders} pedidos
              </Text>
              <Text nowrap fontName="REGULAR_MEDIUM">
                R$ {formatPrice(pkg.totalSales)}
              </Text>
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div
          className="seeMoreWrapper"
          style={{ cursor: "pointer" }}
          onClick={() => setExpanded(!expanded)}
          onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
          role="button"
          tabIndex={0}
        >
          <Text
            margin="16px 0 0 0"
            underline
            fontName="REGULAR"
            color={Theme.colors.secondaryText}
            align="center"
          >
            {expanded ? "ver menos" : "ver mais"}
          </Text>
        </div>
      )}
    </SalesByPackageContainer>
  );
};

export default SalesByPackage;
