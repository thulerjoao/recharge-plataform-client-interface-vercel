import React from "react";
import { HeaderEnviromentContainer } from "./style";

const HeaderEnviroment = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderEnviromentContainer>
      <div className="mainContainer">{children}</div>
    </HeaderEnviromentContainer>
  );
};

export default HeaderEnviroment;
