import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useState } from "react";
import Search from "../../icons/Search.svg";
import Setting from "../../icons/Setting.svg";
import UpArrow from "../../icons/UpArrow.svg";
import DownArrow from "../../icons/DownArrow.svg";
import SearchModal from "../searchModal";
import { SalesHeaderContainer } from "./style";

const SalesHeader = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);

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
      <div
        onClick={() => setOpenModal(!openModal)}
        className={`filter ${openModal && "opened"}`}
      >
        <span>
          <Setting />
        </span>
        <Text align="center" fontName="SMALL">
          FILTRAR
        </Text>
        <span>{openModal ? <UpArrow /> : <DownArrow />}</span>
      </div>
      {openModal && <SearchModal />}
    </SalesHeaderContainer>
  );
};

export default SalesHeader;
