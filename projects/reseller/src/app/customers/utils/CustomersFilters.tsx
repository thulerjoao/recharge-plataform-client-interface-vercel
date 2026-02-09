"use client";

import Input from "@4miga/design-system/components/input";
import { CustomerStatusFilter } from "types/customerType";
import CustomerPurchaseFilters from "./CustomerPurchaseFilters";
import { CustomersFiltersWrapper } from "./style";

interface CustomersFiltersProps {
  localFilter: string;
  setLocalFilter: (value: string) => void;
  localStatus: CustomerStatusFilter;
  onStatusChange: (value: CustomerStatusFilter) => void;
  onSearchApply: (filter: string) => void;
  localDaysWithoutPurchase: string;
  localMinPurchases: string;
  localMaxDaysWithoutPurchase: string;
  onDaysWithoutPurchaseChange: (value: string) => void;
  onMinPurchasesChange: (value: string) => void;
  onMaxDaysWithoutPurchaseChange: (value: string) => void;
  onPurchaseFiltersApply: () => void;
}

const CustomersFilters = ({
  localFilter,
  setLocalFilter,
  localStatus,
  onStatusChange,
  onSearchApply,
  localDaysWithoutPurchase,
  localMinPurchases,
  localMaxDaysWithoutPurchase,
  onDaysWithoutPurchaseChange,
  onMinPurchasesChange,
  onMaxDaysWithoutPurchaseChange,
  onPurchaseFiltersApply,
}: CustomersFiltersProps) => {
  return (
    <CustomersFiltersWrapper>
      <div className="filtersSection">
        <form
          className="searchSection"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSearchApply(localFilter);
          }}
        >
          <Input
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            onBlur={() => onSearchApply(localFilter)}
            placeholder="Buscar por nome, email ou CPF..."
            height={36}
          />
        </form>
        <div className="filterControls">
          <select
            value={localStatus}
            onChange={(e) =>
              onStatusChange(e.target.value as CustomerStatusFilter)
            }
            className="filterSelect"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="excluded">Excluídos</option>
          </select>
        </div>
      </div>
      <CustomerPurchaseFilters
        daysWithoutPurchase={localDaysWithoutPurchase}
        minPurchases={localMinPurchases}
        maxDaysWithoutPurchase={localMaxDaysWithoutPurchase}
        onDaysWithoutPurchaseChange={onDaysWithoutPurchaseChange}
        onMinPurchasesChange={onMinPurchasesChange}
        onMaxDaysWithoutPurchaseChange={onMaxDaysWithoutPurchaseChange}
        onApply={onPurchaseFiltersApply}
      />
    </CustomersFiltersWrapper>
  );
};

export default CustomersFilters;
