import React, { useState } from "react";
import { OnOffContainer } from "./style";

interface OnOffProps {
  onOff: boolean;
  setOnOff?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnOff = ({ onOff, setOnOff }: OnOffProps) => {
  const [state, setState] = useState<boolean>(onOff);

  return (
    <OnOffContainer onClick={() => setState(!state)} onOff={state}>
      <div className="circle" />
    </OnOffContainer>
  );
};

export default OnOff;
