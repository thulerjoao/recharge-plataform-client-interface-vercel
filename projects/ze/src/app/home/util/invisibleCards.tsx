import { invisibleCardsCalc } from "utils/invisibleCardsCalc";

const InvisibleCards = (list: unknown[]) => {
  const count = invisibleCardsCalc(list);
  if (count === 3) return null;

  return (
    <>
      {count >= 1 && (
        <div className="cardEnviroment invisible">
          <span className="invisibleCard" />
        </div>
      )}
      {count >= 2 && (
        <div className="cardEnviroment invisible">
          <span className="invisibleCard" />
        </div>
      )}
    </>
  );
};

export default InvisibleCards;
