import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { CouponValidationResponse } from "types/couponType";
import { formatPrice } from "utils/formatPrice";
import { CouponCardContainer } from "./style";

interface CouponCardProps {
  coupon: Extract<CouponValidationResponse, { valid: true }>;
  selected?: boolean;
  onClick?: () => void;
}

const CouponCard = ({ coupon, selected, onClick }: CouponCardProps) => {
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
          <Text color={Theme.colors.maindark} fontName="REGULAR_SEMI_BOLD">
            {title}
          </Text>
          {isFirstPurchase && (
            <div className="firstPurchaseBadge">
              <Text
                nowrap
                color={Theme.colors.mainlight}
                fontName="TINY_MEDIUM"
              >
                1ª Compra
              </Text>
            </div>
          )}
        </div>
        <div className="discountInfo">
          <Text color={Theme.colors.mainHighlight} fontName="REGULAR_MEDIUM">
            {discountDisplay}
          </Text>
        </div>
      </div>
      <div className="couponValues">
        <Text color={Theme.colors.secondaryText} fontName="TINY_MEDIUM">
          Desconto: R$ {formatPrice(discountAmount)}
        </Text>
        <Text color={Theme.colors.maindark} fontName="REGULAR_SEMI_BOLD">
          Total: R$ {formatPrice(finalAmount)}
        </Text>
      </div>
    </CouponCardContainer>
  );
};

export default CouponCard;
