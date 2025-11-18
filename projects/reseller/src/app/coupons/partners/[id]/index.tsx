"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import CouponCard from "app/coupons/(common)/couponCard";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { CouponResponseType } from "types/couponType";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { CouponSalesContainer } from "./style";
import Button from "@4miga/design-system/components/button";

interface CouponDetailsProps {
  influencerId: string;
}

const CouponSales = ({ influencerId }: CouponDetailsProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [couponData, setCouponData] = useState<CouponResponseType>();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    connectionAPIGet<CouponResponseType>(
      `/influencer/${influencerId}/coupons?page=${page}&limit=${itemsPerPage}`,
      apiUrl,
    )
      .then((res) => {
        setCouponData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [influencerId, page]);

  const handleViewCoupon = (couponId: string) => {
    router.push(`/cupons/detalhes/${couponId}`);
  };

  if (loading) {
    return (
      <CouponSalesContainer>
        <div className="desktop">
          <HeaderEnviroment>
            <DefaultHeader backWard title="CUPONS DO PARCEIRO" />
          </HeaderEnviroment>
        </div>
        <div className="mobile mobileHeader">
          <Text align="center" fontName="LARGE_SEMI_BOLD">
            CUPONS
          </Text>
        </div>
        <div className="loadingContainer">
          <Text
            align="center"
            fontName="REGULAR_MEDIUM"
            color={Theme.colors.mainlight}
          >
            Carregando cupons do parceiro...
          </Text>
        </div>
      </CouponSalesContainer>
    );
  }

  return (
    <CouponSalesContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CUPONS DO PARCEIRO" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CUPONS
        </Text>
      </div>
      <section className="couponsMainContent">
        <div className="headerSection">
          <div className="headerSectionContent">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {couponData?.influencerName}
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.pending}>
              Total de {couponData?.totalCoupons} cupons registrados
            </Text>
          </div>
          <Button
            title="NOVO CUPOM"
            height={32}
            width={145}
            rounded
            onClick={() => {
              router.push(`/cupons/cadastrar?influencerId=${influencerId}`);
            }}
          />
        </div>
        <div className="tableSection">
          <div className="tableHeader">
            <div className="tableCell">Título</div>
            <div className="tableCell">Desconto</div>
            <div className="tableCell">Status</div>
          </div>

          {couponData?.data.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onClick={handleViewCoupon}
            />
          ))}

          {couponData?.data.length === 0 && (
            <div className="emptyState">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                Nenhum cupom encontrado
              </Text>
            </div>
          )}
        </div>
      </section>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={couponData?.totalPages || 1}
      />
    </CouponSalesContainer>
  );
};

export default CouponSales;
