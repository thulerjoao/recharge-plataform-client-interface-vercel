"use client";

import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";
import toast from "react-hot-toast";
import { FeaturedCoupon } from "types/couponType";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface CouponCardProps {
  coupon: FeaturedCoupon;
  isActiveOut?: boolean;
}

const CouponCard = ({ coupon, isActiveOut }: CouponCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const {
    title,
    discountPercentage,
    discountAmount,
    isFirstPurchase,
    minOrderAmount,
  } = coupon;

  const isActive = isActiveOut ? false : true;

  const discountValue = discountPercentage
    ? `${discountPercentage}%`
    : `R$ ${formatPrice(Number(discountAmount) || 0)}`;

  const getDescription = () => {
    if (isFirstPurchase && Number(minOrderAmount) > 0) {
      return `Ganhe ${discountValue} de desconto na sua primeira compra e compras acima de R$ ${formatPrice(Number(minOrderAmount))}`;
    }
    if (isFirstPurchase) {
      return `Ganhe ${discountValue} de desconto na sua primeira compra`;
    }
    if (Number(minOrderAmount) > 0) {
      return `Ganhe ${discountValue} de desconto em compras acima de R$ ${formatPrice(Number(minOrderAmount))}`;
    }
    return `Ganhe ${discountValue} de desconto`;
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(title);
      toast.success("Cupom copiado para área de transferência");
      router.push(`/home?coupon=${title}`);
    } catch (err) {
      return;
    }
  };

  return (
    <CouponCardContainer
      isActive={isActive}
      onClick={() => isActive && handleClick()}
    >
      {!isActive && (
        <div className="expiredOverlay">
          <Text
            align="center"
            color={`${theme.refused}90`}
            fontName="BIG_SEMI_BOLD"
          >
            EXPIRADO
          </Text>
        </div>
      )}
      <section className="topSection">
        <Text
          align="center"
          color={theme.background_02}
          fontName="LARGE_SEMI_BOLD"
        >
          {title.toUpperCase()}
        </Text>
        <Text
          align="center"
          color={theme.mainColor}
          fontName="REGULAR_MEDIUM"
        >
          {discountValue} OFF
        </Text>
      </section>
      <section className="middleSection">
        <div className="leftBall">
          <div className="leftSquare" />
        </div>
        <div className="centerComponent">
          <div className="line" />
        </div>
        <div className="rightBall">
          <div className="rightSquare" />
        </div>
      </section>
      <section className="bottomSection">
        <Text
          align="center"
          color={theme.background_03}
          fontName="TINY_MEDIUM"
          margin="0"
        >
          {getDescription()}
        </Text>
      </section>
    </CouponCardContainer>
  );
};

export default CouponCard;
