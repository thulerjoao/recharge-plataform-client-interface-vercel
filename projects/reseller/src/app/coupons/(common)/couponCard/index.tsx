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
      return `R$ ${formatPrice(Number(coupon.discountAmount))}`;
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
      </div>
      <div className="tableCell">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {getDiscountText(coupon)}
        </Text>
        {coupon.minOrderAmount && (
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            Min - R$ {formatPrice(Number(coupon.minOrderAmount))}
          </Text>
        )}
      </div>
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
