"use client";

import React, { useState, useEffect } from "react";
import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { CouponType } from "types/couponType";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface CouponCardProps {
  coupon: CouponType;
  onClick: (couponId: string) => void;
  onAddToFeatured?: (couponId: string) => void;
  onRemoveFromFeatured?: (couponId: string) => void;
  isFeatured?: boolean;
  currentView?: "all" | "featured";
}

const CouponCard = ({
  coupon,
  onClick,
  onAddToFeatured,
  onRemoveFromFeatured,
  isFeatured,
  currentView,
}: CouponCardProps) => {
  const getDiscountText = (coupon: CouponType) => {
    if (coupon.discountPercentage) {
      return `${coupon.discountPercentage}%`;
    }
    if (coupon.discountAmount) {
      return `R$ ${formatPrice(Number(coupon.discountAmount))}`;
    }
    return "N/A";
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentView === "all") {
      if (isFeatured && onRemoveFromFeatured) {
        onRemoveFromFeatured(coupon.id);
      } else if (!isFeatured && onAddToFeatured) {
        onAddToFeatured(coupon.id);
      }
    } else if (currentView === "featured" && onRemoveFromFeatured) {
      onRemoveFromFeatured(coupon.id);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 539);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getButtonText = () => {
    if (currentView === "all" && isFeatured) {
      return isMobile ? "Remover do destaque" : "Remover";
    }
    if (currentView === "all" && !isFeatured) {
      return isMobile ? "Adicionar ao destaque" : "Adicionar";
    }
    if (currentView === "featured") {
      return isMobile ? "Remover do destaque" : "Remover";
    }
    return "";
  };

  const getButtonWidth = () => {
    return isMobile ? 170 : 100;
  };

  const handleCardClick = () => {
    onClick(coupon.id);
  };

  return (
    <CouponCardContainer onClick={handleCardClick}>
      <div className="tableCell">
        {coupon.isFirstPurchase && (
          <span className="firstPurchaseBadge">1ª Compra</span>
        )}
        <div className="couponTitle">
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
            {coupon.title}
          </Text>
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
      <div className="tableCell actionCell" onClick={handleActionClick}>
        <Button
          title={getButtonText()}
          onClick={handleActionClick}
          width={getButtonWidth()}
          height={28}
          rounded
          style={
            (currentView === "all" && isFeatured) || currentView === "featured"
              ? {
                  backgroundColor: Theme.colors.refused,
                  color: Theme.colors.mainlight,
                }
              : undefined
          }
        />
      </div>
    </CouponCardContainer>
  );
};

export default CouponCard;
