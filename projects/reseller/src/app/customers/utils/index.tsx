"use client";

import LoadingPage from "app/loading";
import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { useCustomers } from "context/customers";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { CustomerStatusFilter, StoreUserType } from "types/customerType";
import CustomerCard from "../../../public/cards/customerCard";
import CustomersFilters from "./CustomersFilters";
import { CustomersPageContainer } from "./style";
import type { CustomerPurchaseFilters as CustomerPurchaseFiltersType } from "context/customers";

function getDisplayData(user: StoreUserType): {
  name: string;
  email: string;
  phone: string;
  documentValue: string;
} {
  const d = user.deletedUserData;
  if (d) {
    return {
      name: d.name?.trim() ?? "—",
      email: d.email ?? "—",
      phone: d.phone ?? "—",
      documentValue: d.documentValue ?? "—",
    };
  }
  return {
    name: user.name?.trim() ?? "—",
    email: user.email ?? "—",
    phone: user.phone ?? "—",
    documentValue: user.documentValue ?? "—",
  };
}

interface Props {
  currentPage: number;
  search: string;
  status: CustomerStatusFilter;
  daysWithoutPurchase?: number;
  minPurchases?: number;
  maxDaysWithoutPurchase?: number;
}

const LIMIT = 6;

function toInputValue(n: number | undefined): string {
  return n === undefined ? "" : String(n);
}

const CustomersPage = ({
  currentPage,
  search,
  status: initialStatus,
  daysWithoutPurchase: initialDaysWithoutPurchase,
  minPurchases: initialMinPurchases,
  maxDaysWithoutPurchase: initialMaxDaysWithoutPurchase,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    loadingCustomers,
    customers,
    getCustomers,
    setPage,
    setFilter,
    setStatus,
    setPurchaseFilters,
  } = useCustomers();

  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] =
    useState<CustomerStatusFilter>(initialStatus);
  const [localDaysWithoutPurchase, setLocalDaysWithoutPurchase] = useState(
    toInputValue(initialDaysWithoutPurchase),
  );
  const [localMinPurchases, setLocalMinPurchases] = useState(
    toInputValue(initialMinPurchases),
  );
  const [localMaxDaysWithoutPurchase, setLocalMaxDaysWithoutPurchase] =
    useState(toInputValue(initialMaxDaysWithoutPurchase));

  const purchaseFiltersFromInputs = (): CustomerPurchaseFiltersType => {
    const days =
      localDaysWithoutPurchase.trim() === ""
        ? undefined
        : Number(localDaysWithoutPurchase);
    const min =
      localMinPurchases.trim() === "" ? undefined : Number(localMinPurchases);
    const max =
      localMaxDaysWithoutPurchase.trim() === ""
        ? undefined
        : Number(localMaxDaysWithoutPurchase);
    return {
      ...(days !== undefined && !Number.isNaN(days)
        ? { daysWithoutPurchase: days }
        : {}),
      ...(min !== undefined && !Number.isNaN(min) ? { minPurchases: min } : {}),
      ...(max !== undefined && !Number.isNaN(max)
        ? { maxDaysWithoutPurchase: max }
        : {}),
    };
  };

  const buildParams = (opts: {
    page: number;
    search?: string;
    status?: CustomerStatusFilter;
    purchaseFilters?: CustomerPurchaseFiltersType;
  }) => {
    const params = new URLSearchParams();
    params.append("page", String(opts.page));
    if (opts.search) params.append("search", opts.search);
    if (opts.status && opts.status !== "all")
      params.append("status", opts.status);
    const pf = opts.purchaseFilters ?? purchaseFiltersFromInputs();
    if (pf.daysWithoutPurchase != null)
      params.append("daysWithoutPurchase", String(pf.daysWithoutPurchase));
    if (pf.minPurchases != null)
      params.append("minPurchases", String(pf.minPurchases));
    if (pf.maxDaysWithoutPurchase != null)
      params.append(
        "maxDaysWithoutPurchase",
        String(pf.maxDaysWithoutPurchase),
      );
    return params;
  };

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(initialStatus);
    setLocalStatus(initialStatus);
    setLocalDaysWithoutPurchase(toInputValue(initialDaysWithoutPurchase));
    setLocalMinPurchases(toInputValue(initialMinPurchases));
    setLocalMaxDaysWithoutPurchase(toInputValue(initialMaxDaysWithoutPurchase));
    const pf: CustomerPurchaseFiltersType = {};
    if (initialDaysWithoutPurchase != null)
      pf.daysWithoutPurchase = initialDaysWithoutPurchase;
    if (initialMinPurchases != null) pf.minPurchases = initialMinPurchases;
    if (initialMaxDaysWithoutPurchase != null)
      pf.maxDaysWithoutPurchase = initialMaxDaysWithoutPurchase;
    setPurchaseFilters(pf);
    getCustomers(currentPage, LIMIT, search, initialStatus, pf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    search,
    initialStatus,
    initialDaysWithoutPurchase,
    initialMinPurchases,
    initialMaxDaysWithoutPurchase,
  ]);

  const handleChangeStatus = (newStatus: CustomerStatusFilter) => {
    setLocalStatus(newStatus);
    const params = buildParams({
      page: 1,
      search: localFilter,
      status: newStatus,
    });
    router.push(`/customers?${params.toString()}`);
  };

  const handleChangeFilter = (newFilter: string) => {
    setLocalFilter(newFilter);
    const params = buildParams({
      page: 1,
      search: newFilter,
      status: localStatus,
    });
    router.push(`/customers?${params.toString()}`);
  };

  const handleApplyPurchaseFilters = () => {
    const pf = purchaseFiltersFromInputs();
    setPurchaseFilters(pf);
    const params = buildParams({
      page: 1,
      search: localFilter,
      status: localStatus,
      purchaseFilters: pf,
    });
    router.push(`/customers?${params.toString()}`);
  };

  const navigateToPage = (newPage: number) => {
    const params = buildParams({
      page: newPage,
      search: localFilter,
      status: localStatus,
    });
    router.push(`/customers?${params.toString()}`);
  };

  if (loadingCustomers) {
    return <LoadingPage />;
  }

  return (
    <CustomersPageContainer>
      <div className="centerContainer">
        <div className="desktop">
          <HeaderEnviroment>
            <DefaultHeader title="CLIENTES" />
          </HeaderEnviroment>
        </div>
        <div className="mobile mobileHeader">
          <Text align="center" fontName="LARGE_SEMI_BOLD">
            CLIENTES
          </Text>
        </div>
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={theme.text_01}>
              Gerenciamento de Clientes
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={theme.text_03}>
              Consulte os clientes da sua loja
            </Text>
          </div>
        </div>
        <CustomersFilters
          localFilter={localFilter}
          setLocalFilter={setLocalFilter}
          localStatus={localStatus}
          onStatusChange={handleChangeStatus}
          onSearchApply={handleChangeFilter}
          localDaysWithoutPurchase={localDaysWithoutPurchase}
          localMinPurchases={localMinPurchases}
          localMaxDaysWithoutPurchase={localMaxDaysWithoutPurchase}
          onDaysWithoutPurchaseChange={setLocalDaysWithoutPurchase}
          onMinPurchasesChange={setLocalMinPurchases}
          onMaxDaysWithoutPurchaseChange={setLocalMaxDaysWithoutPurchase}
          onPurchaseFiltersApply={handleApplyPurchaseFilters}
        />
        <div className="cardsSection">
          {!customers?.data || customers.data.length === 0 ? (
            <div className="emptyState">
              <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
                Nenhum cliente encontrado
              </Text>
            </div>
          ) : (
            (() => {
              const list =
                localStatus === "excluded"
                  ? customers.data.filter(
                      (u: StoreUserType) => u.deletedUserData != null,
                    )
                  : customers.data;
              if (list.length === 0) {
                return (
                  <div className="emptyState">
                    <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
                      {localStatus === "excluded"
                        ? "Nenhum cliente excluído com dados disponíveis"
                        : "Nenhum cliente encontrado"}
                    </Text>
                  </div>
                );
              }
              return (
                <div className="cardsList">
                  {list.map((user: StoreUserType) => {
                    const display = getDisplayData(user);
                    return (
                      <div
                        key={user.id}
                        className="customerCardWrapper"
                        onClick={() => {
                          sessionStorage.setItem(
                            "customerOrdersDisplay",
                            JSON.stringify({ ...display, id: user.id }),
                          );
                          router.push(
                            `/customers/orders?email=${encodeURIComponent(display.email)}`,
                          );
                        }}
                      >
                        <CustomerCard
                          displayData={display}
                          isExcluded={localStatus === "excluded"}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })()
          )}
        </div>
        {(() => {
          const displayedList =
            localStatus === "excluded" && customers?.data
              ? customers.data.filter(
                  (u: StoreUserType) => u.deletedUserData != null,
                )
              : customers?.data ?? [];
          const hasItemsToShow = displayedList.length > 0;
          return (
            hasItemsToShow &&
            customers !== undefined && (
              <Pagination
                page={customers.page}
                setPage={navigateToPage}
                totalPages={customers.totalPages}
              />
            )
          );
        })()}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Text fontName="TINY" color={theme.text_03}>
            Total: {customers?.totalClients ?? 0} clientes
          </Text>
        </div>
      </div>
    </CustomersPageContainer>
  );
};

export default CustomersPage;
