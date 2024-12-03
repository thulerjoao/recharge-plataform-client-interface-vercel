import Input from "@4miga/design-system/components/input";
import { SocialNetworkInputContainer } from "./style";

interface Props {
  title: string;
}

const SocialNetworkInput = () => {
  return (
    <SocialNetworkInputContainer>
      <Input height={48} />
    </SocialNetworkInputContainer>
  );
};

export default SocialNetworkInput;
