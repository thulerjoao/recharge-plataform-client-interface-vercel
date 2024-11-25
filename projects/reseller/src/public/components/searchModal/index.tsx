"use client";

import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import React, { useState } from "react";
import CalendarComponent from "../calendar";
import Blank from "./icons/Blank.svg";
import Check from "./icons/Check.svg";
import DownArrow from "./icons/DownArrow.svg";
import UpArrow from "./icons/UpArrow.svg";
import { CloseModal, SearchModalContainer } from "./style";
import SearchComponent from "../searchComponent";

interface Props {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ setOpenModal }: Props) => {
  //Date states
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date | [Date, Date]>(new Date());
  //Payment states:
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [paymentApproved, setPaymentApproved] = useState<boolean>(false);
  const [paymentInAnalysis, setPaymentInAnalysis] = useState<boolean>(false);
  const [paymentRefused, setPaymentRefused] = useState<boolean>(false);
  //Recharge states
  const [openRecharge, setOpenRecharge] = useState<boolean>(false);
  const [rechargeApproved, setRechargeApproved] = useState<boolean>(false);
  const [rechargeInAnalysis, setRechargeInAnalysis] = useState<boolean>(false);
  const [rechargeRefused, setRechargeRefused] = useState<boolean>(false);

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
