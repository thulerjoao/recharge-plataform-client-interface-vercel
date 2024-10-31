import styled from "styled-components";

export const MyOrderContainer = styled.div`
  width: 100%;
  max-width: 824px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .topMessage {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;

    span {
      position: absolute;
      left: 0;
      cursor: pointer;
    }
  }

  .cardsSection {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
  }
`;
