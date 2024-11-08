import Text from "@4miga/design-system/components/Text";
import { SalesHeaderContainer } from "./style";
import Input from "@4miga/design-system/components/input";
import DownArrow from "../../icons/DownArrow.svg";
import Search from "../../icons/Search.svg";
import Setting from "../../icons/Setting.svg";

const SalesHeader = () => {
  return (
    <SalesHeaderContainer>
      <div className="headerTitle">
        <Text fontName="LARGE_SEMI_BOLD">VENDAS</Text>
      </div>
      <div className="searchInput">
        <Input
          padding="0 44px 0 16px"
          rightElement={<Search />}
          placeholder="Pesquisar..."
          height={40}
        />
      </div>
      <div className="filter">
        <span>
          <Setting />
        </span>
        <Text align="center" fontName="SMALL">
          FILTRAR
        </Text>
        <span>
          <DownArrow />
        </span>
      </div>
    </SalesHeaderContainer>
  );
};

export default SalesHeader;
