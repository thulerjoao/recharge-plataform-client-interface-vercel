"use client";

import { useDevice } from "context/deviceContext";
import React from "react";
import SearchComponent from "../../../searchComponent";
import { CloseModal, SearchModalContainer } from "./style";

interface Props {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ setOpenModal }: Props) => {
  const { device } = useDevice();

  return (
    <>
      <SearchModalContainer>
        <SearchComponent />
      </SearchModalContainer>
      {device !== "mobile" && (
        <CloseModal onClick={() => setOpenModal(false)} />
      )}
    </>
  );
};

export default SearchModal;
