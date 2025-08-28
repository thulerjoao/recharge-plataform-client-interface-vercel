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

  const getExpiryText = (date?: Date) => {
    if (!date) return "Sem expiração";
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expirado";
    if (diffDays === 0) return "Expira hoje";
    if (diffDays === 1) return "Expira amanhã";
    if (diffDays <= 7) return `Expira em ${diffDays} dias`;
    return date.toLocaleDateString("pt-BR");
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
        <div className="mobileInfo">
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            {coupon.influencerName}
          </Text>
        </div>
      </div>

      {/* Coluna 2: Desconto e Valor Mínimo */}
      <div className="tableCell">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {getDiscountText(coupon)}
        </Text>
        {coupon.minOrderAmount && (
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            Min: {formatPrice(coupon.minOrderAmount)}
          </Text>
        )}
      </div>

      {/* Coluna 3: Influencer (oculta em mobile) */}
      <div className="tableCell desktopOnly">
        <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
          {coupon.influencerName}
        </Text>
      </div>

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
