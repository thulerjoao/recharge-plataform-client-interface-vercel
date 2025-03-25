import { invisibleCardsCalc } from "utils/invisibleCardsCalc";

const InvisibleCards = (list: any[]) => {
  return (
    <>
      {invisibleCardsCalc(list) === 1 && (
        <div className="cardEnviroment invisible">
          <span className="invisibleCard" />
        </div>
      )}
      {invisibleCardsCalc(list) === 2 && (
        <>
          <div className="cardEnviroment invisible">
            <span className="invisibleCard" />
          </div>
          <div className="cardEnviroment invisible">
            <span className="invisibleCard" />
          </div>
        </>
      )}
    </>
  );
};

export default InvisibleCards;
