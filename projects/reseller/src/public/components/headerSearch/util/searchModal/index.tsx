"use client";

import React from "react";
import SearchComponent from "../../../searchComponent";
import { CloseModal, SearchModalContainer } from "./style";

interface Props {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ setOpenModal }: Props) => {
  return (
    <>
      <SearchModalContainer>
        <SearchComponent />
      </SearchModalContainer>
      <CloseModal onClick={() => setOpenModal(false)} />
    </>
  );
};

export default SearchModal;
