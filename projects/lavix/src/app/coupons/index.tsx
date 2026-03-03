"use client";

import Text from "@4miga/design-system/components/Text";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import CouponCard from "public/cards/couponCard";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { FeaturedCoupon } from "types/couponType";
import { CouponsContainer } from "./style";

const CouponsPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [featuredCoupons, setFeaturedCoupons] = useState<FeaturedCoupon[]>([]);

  useEffect(() => {
    connectionAPIGet<FeaturedCoupon[]>("/coupon/featured")
      .then((res) => {
        setFeaturedCoupons(res);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CouponsContainer>
      <div className="header">
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          color={theme.text_01}
          margin="0 0 8px 0"
        >
          Cupons Disponíveis
        </Text>
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          color={theme.text_03}
          margin="0 0 40px 0"
        >
          Escolha um cupom e aproveite descontos exclusivos em suas compras
        </Text>
      </div>

      {featuredCoupons.length === 0 && !loading && (
        <div className="emptyState">
          <Text fontName="REGULAR" color={theme.pending} align="center">
            Ainda não temos cupons disponíveis, volte mais tarde!
          </Text>
        </div>
      )}

      <div className="couponsList">
        {featuredCoupons?.length > 0 &&
          featuredCoupons?.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              isActiveOut={!coupon.isActive}
            />
          ))}
      </div>
    </CouponsContainer>
  );
};

export default CouponsPage;
