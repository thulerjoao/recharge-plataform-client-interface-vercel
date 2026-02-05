"use client";

import LoadingPage from "app/loading";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useCustomers } from "context/customers";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { CustomerStatusFilter, StoreUserType } from "types/customerType";
import CustomerCard from "../../../public/cards/customerCard";
import Search from "../../../public/icons/Search.svg";
import { CustomersPageContainer } from "./style";

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
}

const LIMIT = 6;

const CustomersPage = ({
  currentPage,
  search,
  status: initialStatus,
}: Props) => {
  const router = useRouter();
  const {
    loadingCustomers,
    customers,
    getCustomers,
    setPage,
    setFilter,
    setStatus,
  } = useCustomers();

  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] =
    useState<CustomerStatusFilter>(initialStatus);

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(initialStatus);
    setLocalStatus(initialStatus);
    getCustomers(currentPage, LIMIT, search, initialStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, initialStatus]);

  const handleChangeStatus = (newStatus: CustomerStatusFilter) => {
    setLocalStatus(newStatus);
    const params = new URLSearchParams();
    params.append("page", "1");
    if (localFilter) params.append("search", localFilter);
    if (newStatus !== "all") params.append("status", newStatus);
    router.push(`/customers?${params.toString()}`);
  };

  const handleChangeFilter = (newFilter: string) => {
    setLocalFilter(newFilter);
    const params = new URLSearchParams();
    params.append("page", "1");
    if (newFilter) params.append("search", newFilter);
    if (localStatus !== "all") params.append("status", localStatus);
    router.push(`/customers?${params.toString()}`);
  };

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    params.append("page", newPage.toString());
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== "all") params.append("status", localStatus);
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
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              Gerenciamento de Clientes
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Consulte os clientes da sua loja
            </Text>
          </div>
        </div>
        <div className="filtersSection">
          <form
            className="searchSection"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleChangeFilter(localFilter);
            }}
          >
            <Input
              value={localFilter}
              onChange={(e) => setLocalFilter(e.target.value)}
              onBlur={() => handleChangeFilter(localFilter)}
              placeholder="Buscar por nome, email ou CPF..."
              height={36}
            />
            <div
              className="searchButton"
              onClick={() => handleChangeFilter(localFilter)}
            >
              <Search />
            </div>
          </form>
          <div className="filterControls">
            <select
              value={localStatus}
              onChange={(e) => {
                handleChangeStatus(e.target.value as CustomerStatusFilter);
              }}
              className="filterSelect"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="excluded">Excluídos</option>
            </select>
          </div>
        </div>
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
          <Text fontName="TINY" color={Theme.colors.secondaryText}>
            Total: {customers?.totalClients ?? 0} clientes
          </Text>
        </div>
      </div>
    </CustomersPageContainer>
  );
};

export default CustomersPage;
