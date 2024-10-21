import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { DescriptionContainer } from "./style";
import bigo from "./temp/bigo.png";

const Description = () => {
  return (
    <DescriptionContainer>
      <Image src={bigo} alt="General product image" />
      <Text margin="24px 0 0 0 " fontType="BIG_SEMI_BOLD">
        BIGO LIVE
      </Text>
      <div className="instructions">
        <Text
          margin="24px 0 0 0 "
          color={Theme.colors.secondaryText}
          fontType="REGULAR_SEMI_BOLD"
        >
          Instruções
        </Text>
        <Text margin="24px 0 0 0 " fontType="REGULAR">
          Lorem ipsum dolor sit amet consectetur. Egestas egestas nec elementum
          eleifend ac. Enim enim sit morbi pulvinar velit dictum venenatis erat.
          Vitae mi eget donec nisl id.
        </Text>
        <Text margin="24px 0 0 0 " fontType="REGULAR">
          Nulla suspendisse ut quis lorem sit vivamus adipiscing lobortis id. At
          vitae velit lectus non felis. Id molestie venenatis mi sed amet nunc.
          Mattis lectus dis urna massa vitae duis. Phasellus varius mauris morbi
          sit leo parturient.
        </Text>
        <Text margin="24px 0 0 0 " fontType="REGULAR">
          Lorem ipsum dolor sit amet consectetur. Egestas egestas nec elementum
          eleifend ac. Enim enim sit morbi pulvinar velit dictum venenatis erat.
          Vitae mi eget donec nisl id.
        </Text>
      </div>
      <div className="instructions">
        <Text
          margin="24px 0 0 0 "
          color={Theme.colors.secondaryText}
          fontType="REGULAR_SEMI_BOLD"
        >
          Instruções
        </Text>
        <Text margin="24px 0 0 0 " fontType="REGULAR">
          Lorem ipsum dolor sit amet consectetur. Egestas egestas nec elementum
          eleifend ac. Enim enim sit morbi pulvinar velit dictum venenatis erat.
          Vitae mi eget donec nisl id.
        </Text>
        <Text margin="24px 0 0 0 " fontType="REGULAR">
          Nulla suspendisse ut quis lorem sit vivamus adipiscing lobortis id. At
          vitae velit lectus non felis. Id molestie venenatis mi sed amet nunc.
          Mattis lectus dis urna massa vitae duis. Phasellus varius mauris morbi
          sit leo parturient.
        </Text>
      </div>
    </DescriptionContainer>
  );
};

export default Description;
