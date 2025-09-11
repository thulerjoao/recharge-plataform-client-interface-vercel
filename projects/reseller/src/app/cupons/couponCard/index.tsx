"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { CouponType } from "types/couponType";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface CouponCardProps {
  coupon: CouponType;
  onClick: (couponId: string) => void;
}

const CouponCard = ({ coupon, onClick }: CouponCardProps) => {
  const getDiscountText = (coupon: CouponType) => {
    if (coupon.discountPercentage) {
      return `${coupon.discountPercentage}%`;
    }
    if (coupon.discountAmount) {
      return formatPrice(Number(coupon.discountAmount));
    }
    return "N/A";
  };

  return (
    <CouponCardContainer onClick={() => onClick(coupon.id)}>
      {/* Coluna 1: Título e Badge */}
      <div className="tableCell">
        <div className="couponTitle">
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
            {coupon.title}
          </Text>
          {coupon.isFirstPurchase && (
            <span className="firstPurchaseBadge">1ª</span>
          )}
        </div>
        {/* Informação adicional em mobile */}
        {/* <div className="mobileInfo">
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            {coupon.influencer.name}
          </Text>
        </div> */}
      </div>

      {/* Coluna 2: Desconto e Valor Mínimo */}
      <div className="tableCell">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {getDiscountText(coupon)}
        </Text>
        {coupon.minOrderAmount && (
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            Min: {formatPrice(Number(coupon.minOrderAmount))}
          </Text>
        )}
      </div>

      {/* Coluna 3: Influencer (oculta em mobile) */}
      {/* <div className="tableCell desktopOnly">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {coupon.influencer.name}
        </Text>
      </div> */}

      {/* Coluna 4: Status */}
      <div className="tableCell">
        <div
          className={`statusBadge ${coupon.isActive ? "active" : "inactive"}`}
        >
          <Text
            align="center"
            fontName="SMALL_MEDIUM"
            color={
              coupon.isActive ? Theme.colors.approved : Theme.colors.refused
            }
          >
            {coupon.isActive ? "Ativo" : "Inativo"}
          </Text>
        </div>
      </div>
    </CouponCardContainer>
  );
};

export default CouponCard;
