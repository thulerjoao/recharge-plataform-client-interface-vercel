"use client";

import Text from "@4miga/design-system/components/Text";
import React, { useState } from "react";
import CalendarComponent from "../calendar";
import Blank from "./icons/Blank.svg";
import Check from "./icons/Check.svg";
import DownArrow from "./icons/DownArrow.svg";
import UpArrow from "./icons/UpArrow.svg";
import { SearchComponentContainer } from "./style";

interface Props {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchComponent = ({ setOpenModal }: Props) => {
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

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const handleDateChange = ({ from, to }) => {
    setStartDate(from);
    setEndDate(to);
    console.log("Data início:", from, "Data fim:", to);
  };

  return (
    <SearchComponentContainer>
      <div onClick={() => setOpenDate(!openDate)} className="option">
        <Text fontName="SMALL_MEDIUM">Data</Text>
        {openDate ? <UpArrow /> : <DownArrow />}
      </div>
      {openDate && (
        <CalendarComponent
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
      )}
      <div onClick={() => setOpenPayment(!openPayment)} className="option">
        <Text fontName="SMALL_MEDIUM">Status de pagamento</Text>
        {openPayment ? <UpArrow /> : <DownArrow />}
      </div>
      {openPayment && (
        <div className="innerList">
          <div
            className="innerOption"
            onClick={() => setPaymentApproved(!paymentApproved)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Pagamento aprovado</Text>
            </div>
            {paymentApproved ? <Check /> : <Blank />}
          </div>
          <div
            className="innerOption"
            onClick={() => setPaymentInAnalysis(!paymentInAnalysis)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Pagamento em análise</Text>
            </div>
            {paymentInAnalysis ? <Check /> : <Blank />}
          </div>
          <div
            className="innerOption"
            onClick={() => setPaymentRefused(!paymentRefused)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Pagamento recusado</Text>
            </div>
            {paymentRefused ? <Check /> : <Blank />}
          </div>
        </div>
      )}
      <div onClick={() => setOpenRecharge(!openRecharge)} className="option">
        <Text fontName="SMALL_MEDIUM">Status de recarga</Text>
        {openRecharge ? <UpArrow /> : <DownArrow />}
      </div>
      {openRecharge && (
        <div className="innerList">
          <div
            className="innerOption"
            onClick={() => setRechargeApproved(!rechargeApproved)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Recarga aprovada</Text>
            </div>
            {rechargeApproved ? <Check /> : <Blank />}
          </div>
          <div
            className="innerOption"
            onClick={() => setRechargeInAnalysis(!rechargeInAnalysis)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Recarga em processamento</Text>
            </div>
            {rechargeInAnalysis ? <Check /> : <Blank />}
          </div>
          <div
            className="innerOption"
            onClick={() => setRechargeRefused(!rechargeRefused)}
          >
            <div>
              <Text fontName="SMALL_MEDIUM">Recarga não concluída</Text>
            </div>
            {rechargeRefused ? <Check /> : <Blank />}
          </div>
        </div>
      )}
    </SearchComponentContainer>
  );
};

export default SearchComponent;
