"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useCoupons } from "context/coupon";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import CouponCard from "../couponCard";
import Search from "../icons/Search.svg";
import { CouponsContainer } from "./style";

interface Props {
  currentPage: number;
  search: string;
  status: "all" | "active" | "inactive";
  type: "all" | "percentage" | "fixed" | "first-purchase";
}

const CouponsPage = ({
  currentPage,
  search,
  status: initialStatus,
  type: initialType,
}: Props) => {
  const router = useRouter();
  const {
    loadingCoupons,
    coupons,
    getCoupons,
    setPage,
    setFilter,
    setStatus,
    setCouponType,
  } = useCoupons();

  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] = useState(initialStatus);
  const [localType, setLocalType] = useState(initialType);

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(initialStatus);
    setCouponType(initialType);
    getCoupons(currentPage, 8, search, initialStatus, initialType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, initialStatus, initialType]);

  const handleChangeStatus = (newStatus: "all" | "active" | "inactive") => {
    setLocalStatus(newStatus);
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (newStatus !== "all") params.append("status", newStatus);
    if (localType !== "all") params.append;
    const queryString = params.toString();
    const url = `/cupons/1${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  const handleChangeType = (
    newType: "all" | "percentage" | "fixed" | "first-purchase",
  ) => {
    setLocalType(newType);
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== "all") params.append("status", localStatus);
    if (newType !== "all") params.append("type", newType);

    const queryString = params.toString();
    const url = `/cupons/1${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  const handleChangeFilter = (newFilter: string) => {
    setLocalFilter(newFilter);
    const params = new URLSearchParams();
    if (newFilter) params.append("search", newFilter);
    if (localStatus !== "all") params.append("status", localStatus);
    if (localType !== "all") params.append("type", localType);

    const queryString = params.toString();
    const url = `/cupons/1${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  const handleCreateCoupon = () => {
    router.push("/cupons/cadastrar");
  };

  const handleViewCoupon = (couponId: string) => {
    router.push(`/cupons/detalhes/${couponId}`);
  };

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== "all") params.append("status", localStatus);
    if (localType !== "all") params.append("type", localType);

    const queryString = params.toString();
    const url = `/cupons/${newPage}${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  return (
    <CouponsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="CUPONS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CUPONS
        </Text>
      </div>

      <div className="mainContentComponent">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              Gerenciamento de Cupons
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Gerencie todos os cupons da plataforma
            </Text>
          </div>
          <Button
            title="NOVO CUPOM"
            onClick={handleCreateCoupon}
            width={140}
            height={32}
            rounded
          />
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
              placeholder="Buscar por título ou influencer..."
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
              onChange={(e) =>
                handleChangeStatus(
                  e.target.value as "all" | "active" | "inactive",
                )
              }
              className="filterSelect"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
            <select
              value={localType}
              onChange={(e) =>
                handleChangeType(
                  e.target.value as
                    | "all"
                    | "percentage"
                    | "fixed"
                    | "first-purchase",
                )
              }
              className="filterSelect"
            >
              <option value="all">Todos os tipos</option>
              <option value="percentage">Porcentagem</option>
              <option value="fixed">Valor fixo</option>
              <option value="first-purchase">Primeira compra</option>
            </select>
          </div>
        </div>

        {loadingCoupons && (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Text
              align="center"
              fontName="REGULAR_MEDIUM"
              color={Theme.colors.secondaryText}
            >
              Carregando cupons...
            </Text>
          </div>
        )}
        {!loadingCoupons && (!coupons?.data || coupons.data.length === 0) && (
          <div className="emptyState">
            <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
              Nenhum cupom encontrado
            </Text>
          </div>
        )}
        {!loadingCoupons && !(!coupons?.data || coupons.data.length === 0) && (
          <section className="tableSection">
            <div className="tableHeader">
              <div className="tableCell">Título</div>
              <div className="tableCell">Desconto</div>
              {/* <div className="tableCell">Influencer</div> */}
              <div className="tableCell">Status</div>
            </div>

            {loadingCoupons ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <Text fontName="REGULAR_MEDIUM">Carregando...</Text>
              </div>
            ) : (
              coupons?.data?.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onClick={handleViewCoupon}
                />
              ))
            )}
          </section>
        )}
      </div>
      {coupons?.data.length !== 0 && (
        <Pagination
          page={coupons?.page || 1}
          setPage={navigateToPage}
          totalPages={coupons?.totalPages || 1}
        />
      )}
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Text fontName="TINY" color={Theme.colors.secondaryText}>
          Total: {coupons?.totalCoupons || 0} cupons encontrados
        </Text>
      </div>
    </CouponsContainer>
  );
};

export default CouponsPage;
