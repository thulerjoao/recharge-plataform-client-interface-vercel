import Text from "@4miga/design-system/components/Text";
import { useState } from "react";
import Blank from "../../icons/Blank.svg";
import Check from "../../icons/Check.svg";
import DownArrow from "../../icons/DownArrow.svg";
import UpArrow from "../../icons/UpArrow.svg";
import { SearchModalContainer } from "./style";

const SearchModal = () => {
  //Date states
  const [openDate, setOpenDate] = useState<boolean>(false);
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

  return (
    <SearchModalContainer>
      <div onClick={() => setOpenDate(!openDate)} className="option">
        <Text fontName="SMALL_MEDIUM">Data</Text>
        {openDate ? <UpArrow /> : <DownArrow />}
      </div>
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
    </SearchModalContainer>
  );
};

export default SearchModal;
