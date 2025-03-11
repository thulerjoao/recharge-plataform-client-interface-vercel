import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { CardContainer } from "./style";

interface CardProps {
  // image: StaticImageData;
  imageUrl: string;
  name: string;
}

const GameCard = ({ imageUrl, name }: CardProps) => {
  const route = useRouter();
  const [isImageValid, setIsImageValid] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isValidImageUrl = async (): Promise<boolean> => {
    try {
      const response = await fetch(imageUrl, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      return response.ok && contentType?.startsWith("image");
    } catch {
      return false;
    }
  };
  useEffect(() => {
    const checkImage = async () => {
      const valid = await isValidImageUrl();
      setIsImageValid(valid);
    };

    checkImage();
  }, [imageUrl, isValidImageUrl]);

  return (
    <CardContainer onClick={() => route.push("/products")}>
      <Image
        src={isImageValid ? imageUrl : ImageNotFound}
        alt={`Imagem do jogo ${name}`}
        height={200}
        width={200}
      />
      <Text
        tag="h2"
        align="center"
        fontName="REGULAR_MEDIUM"
        margin="16px 0 0 0"
      >
        {name}
      </Text>
    </CardContainer>
  );
};

export default GameCard;
