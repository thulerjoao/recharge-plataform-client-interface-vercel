import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { CouponValidationResponse } from "types/couponType";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface CouponCardProps {
  coupon: Extract<CouponValidationResponse, { valid: true }>;
  selected?: boolean;
  onClick?: () => void;
}

const CouponCard = ({ coupon, selected, onClick }: CouponCardProps) => {
  const theme = useTheme();
  const { discountAmount, finalAmount, coupon: couponData } = coupon;
  const {
    title,
    discountPercentage,
    discountAmount: couponDiscountAmount,
    isFirstPurchase,
  } = couponData;

  // Determina o tipo de desconto para exibição
  const discountDisplay = discountPercentage
    ? `${discountPercentage}% OFF`
    : `R$ ${formatPrice(couponDiscountAmount || 0)} OFF`;

  return (
    <CouponCardContainer selected={selected} onClick={onClick}>
      <div className="couponInfo">
        <div className="couponHeader">
          <Text color={theme.background_01} fontName="REGULAR_SEMI_BOLD">
            {title}
          </Text>
          {isFirstPurchase && (
            <div className="firstPurchaseBadge">
              <Text
                nowrap
                color={theme.text_01}
                fontName="TINY_MEDIUM"
              >
                1ª Compra
              </Text>
            </div>
          )}
        </div>
        <div className="discountInfo">
          <Text color={theme.mainColor} fontName="REGULAR_MEDIUM">
            {discountDisplay}
          </Text>
        </div>
      </div>
      <div className="couponValues">
        <Text color={theme.text_03} fontName="TINY_MEDIUM">
          Desconto: R$ {formatPrice(discountAmount)}
        </Text>
        <Text color={theme.background_01} fontName="REGULAR_SEMI_BOLD">
          Total: R$ {formatPrice(finalAmount)}
        </Text>
      </div>
    </CouponCardContainer>
  );
};

export default CouponCard;
