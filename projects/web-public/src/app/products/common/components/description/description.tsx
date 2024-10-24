import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "app/contexts/deviceContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DescriptionContainer } from "./style";
import bigo from "./temp/bigo.png";

const Description = () => {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const { device } = useDevice();

  useEffect(() => {
    device === "desktop" ? setSeeMore(true) : setSeeMore(false);
  }, [device]);

  return (
    <DescriptionContainer>
      <Image src={bigo} alt="General product image" />
      <div className="centerContent">
        <Text margin="24px 0 0 0 " fontName="BIG_SEMI_BOLD">
          BIGO LIVE
        </Text>
        {!seeMore && (
          <span style={{ cursor: "pointer" }} onClick={() => setSeeMore(true)}>
            <Text
              margin="8px 0 0 0"
              underline
              fontName="REGULAR"
              color={Theme.colors.secondaryText}
            >
              ver mais informações
            </Text>
          </span>
        )}
      </div>
      {seeMore && (
        <div className="centerContent">
          <div className="instructions">
            <Text
              margin="24px 0 0 0 "
              color={Theme.colors.secondaryText}
              fontName="REGULAR_SEMI_BOLD"
            >
              Instruções
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              Lorem ipsum dolor sit amet consectetur. Egestas egestas nec
              elementum eleifend ac. Enim enim sit morbi pulvinar velit dictum
              venenatis erat. Vitae mi eget donec nisl id.
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              Nulla suspendisse ut quis lorem sit vivamus adipiscing lobortis
              id. At vitae velit lectus non felis. Id molestie venenatis mi sed
              amet nunc. Mattis lectus dis urna massa vitae duis. Phasellus
              varius mauris morbi sit leo parturient.
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              Lorem ipsum dolor sit amet consectetur. Egestas egestas nec
              elementum eleifend ac. Enim enim sit morbi pulvinar velit dictum
              venenatis erat. Vitae mi eget donec nisl id.
            </Text>
          </div>
          <div className="instructions">
            <Text
              margin="24px 0 0 0 "
              color={Theme.colors.secondaryText}
              fontName="REGULAR_SEMI_BOLD"
            >
              Instruções
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              Lorem ipsum dolor sit amet consectetur. Egestas egestas nec
              elementum eleifend ac. Enim enim sit morbi pulvinar velit dictum
              venenatis erat. Vitae mi eget donec nisl id.
            </Text>
            <Text margin="24px 0 0 0 " fontName="REGULAR">
              Nulla suspendisse ut quis lorem sit vivamus adipiscing lobortis
              id. At vitae velit lectus non felis. Id molestie venenatis mi sed
              amet nunc. Mattis lectus dis urna massa vitae duis. Phasellus
              varius mauris morbi sit leo parturient.
            </Text>
          </div>
          {seeMore && device !== "desktop" && (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSeeMore(false)}
            >
              <Text
                margin="24px 0 0 0"
                underline
                fontName="REGULAR"
                align="center"
                color={Theme.colors.secondaryText}
              >
                ver menos
              </Text>
            </span>
          )}
        </div>
      )}
    </DescriptionContainer>
  );
};

export default Description;
