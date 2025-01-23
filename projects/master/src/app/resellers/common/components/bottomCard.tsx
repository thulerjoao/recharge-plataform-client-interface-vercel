import Text from "@4miga/design-system/components/Text";
import { ReactElement } from "react";
import { BottomCardContainer } from "./style";

interface Props {
  cursorPointer?: boolean;
  margin?: string;
  logo_01?: ReactElement;
  logo_02?: ReactElement;
  backgroundColor?: string;
  fontColor?: string;
  title_01: string;
  title_02: string;
}

const BottomCard = ({
  cursorPointer,
  margin,
  fontColor,
  backgroundColor,
  logo_01,
  logo_02,
  title_01,
  title_02,
}: Props) => {
  return (
    <BottomCardContainer
      cursorPointer={cursorPointer}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      <div className="first">{logo_01 && logo_01}</div>
      <div className="second">
        <Text
          align="center"
          color={fontColor && fontColor}
          fontName="REGULAR_MEDIUM"
        >
          {title_01}
        </Text>
      </div>
      <div className="third">
        <Text
          align="center"
          color={fontColor && fontColor}
          fontName="REGULAR_MEDIUM"
        >
          {title_02}
        </Text>
      </div>
      <div className="forth">{logo_02 && logo_02}</div>
    </BottomCardContainer>
  );
};

export default BottomCard;
