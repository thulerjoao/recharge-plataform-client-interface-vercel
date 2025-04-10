import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import SearchModal from "public/components/headerSearch/util/searchModal";
import { useState } from "react";
import DownArrow from "./icons/DownArrow.svg";
import Search from "./icons/Search.svg";
import Setting from "./icons/Setting.svg";
import UpArrow from "./icons/UpArrow.svg";
import { HeaderSearchContainer } from "./style";

interface HeaderSerachProps {
  title: string;
}

const HeaderSearch = ({ title }: HeaderSerachProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <HeaderSearchContainer>
      <div className="headerTitle">
        <Text fontName="LARGE_SEMI_BOLD">{title.toUpperCase()}</Text>
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
        onClick={() => setOpenModal(true)}
        className={`filter ${openModal && "opened"}`}
      >
        <span>
          <Setting />
        </span>
        <Text align="center" fontName="SMALL">
          FILTRAR
        </Text>
        <span onClick={() => setOpenModal(!openModal)}>
          {openModal ? <UpArrow /> : <DownArrow />}
        </span>
      </div>
      {openModal && <SearchModal setOpenModal={setOpenModal} />}
    </HeaderSearchContainer>
  );
};

export default HeaderSearch;
