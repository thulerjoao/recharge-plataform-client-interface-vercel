"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface Coupon {
  id: string;
  title: string;
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt?: Date;
  timesUsed: number;
  totalSalesAmount: number;
  maxUses?: number;
  minOrderAmount?: number;
  isActive: boolean;
  influencerId: string;
  influencerName: string;
  isFirstPurchase: boolean;
  createdAt: Date;
}

interface CouponCardProps {
  coupon: Coupon;
  onClick: (couponId: string) => void;
}

const CouponCard = ({ coupon, onClick }: CouponCardProps) => {
  const getDiscountText = (coupon: Coupon) => {
    if (coupon.discountPercentage) {
      return `${coupon.discountPercentage}%`;
    }
    if (coupon.discountAmount) {
      return formatPrice(coupon.discountAmount);
    }
    return "N/A";
  };

  return (
    <CouponCardContainer onClick={() => onClick(coupon.id)}>
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
          R$ {getDiscountText(coupon)}
        </Text>
        {coupon.minOrderAmount && (
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            Min: R$ {formatPrice(coupon.minOrderAmount)}
          </Text>
        )}
      </div>
      <div className="tableCell">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {coupon.influencerName}
        </Text>
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
