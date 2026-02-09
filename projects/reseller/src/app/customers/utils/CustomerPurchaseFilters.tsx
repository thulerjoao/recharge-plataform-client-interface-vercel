"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { PurchaseFiltersWrapper } from "./style";

interface CustomerPurchaseFiltersProps {
  daysWithoutPurchase: string;
  minPurchases: string;
  maxDaysWithoutPurchase: string;
  onDaysWithoutPurchaseChange: (value: string) => void;
  onMinPurchasesChange: (value: string) => void;
  onMaxDaysWithoutPurchaseChange: (value: string) => void;
  onApply: () => void;
}

const CustomerPurchaseFilters = ({
  daysWithoutPurchase,
  minPurchases,
  maxDaysWithoutPurchase,
  onDaysWithoutPurchaseChange,
  onMinPurchasesChange,
  onMaxDaysWithoutPurchaseChange,
  onApply,
}: CustomerPurchaseFiltersProps) => {
  return (
    <PurchaseFiltersWrapper>
      {/* <Text
        fontName="SMALL_MEDIUM"
        color={Theme.colors.secondaryText}
        align="center"
      >
        Filtro de compras
      </Text> */}
      <div className="purchaseFilterInputs">
        <div className="filterField">
          <Input
            type="number"
            min={0}
            value={daysWithoutPurchase}
            onChange={(e) => onDaysWithoutPurchaseChange(e.target.value)}
            placeholder="Ex: 7"
            height={32}
          />
          <label>
            <Text
              align="center"
              fontName="TINY"
              color={Theme.colors.secondaryText}
            >
              Dias sem comprar
            </Text>
          </label>
        </div>
        <div className="filterField">
          <Input
            type="number"
            min={0}
            value={maxDaysWithoutPurchase}
            onChange={(e) => onMaxDaysWithoutPurchaseChange(e.target.value)}
            placeholder="Ex: 14"
            height={32}
          />
          <label>
            <Text
              align="center"
              fontName="TINY"
              color={Theme.colors.secondaryText}
            >
              Máx. dias sem comprar
            </Text>
          </label>
        </div>
        <div className="filterField">
          <Input
            type="number"
            min={0}
            value={minPurchases}
            onChange={(e) => onMinPurchasesChange(e.target.value)}
            placeholder="Ex: 3"
            height={32}
          />
          <label>
            <Text
              align="center"
              fontName="TINY"
              color={Theme.colors.secondaryText}
            >
              Mínimo de compras
            </Text>
          </label>
        </div>
      </div>
      <div className="purchaseFilterButton">
        <Button
          onClick={onApply}
          title="Aplicar"
          height={28}
          width={120}
          rounded
        />
      </div>
    </PurchaseFiltersWrapper>
  );
};

export default CustomerPurchaseFilters;
