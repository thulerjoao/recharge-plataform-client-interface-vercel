import styled from "styled-components";

interface Props {
  backgroundColor?: string;
  margin?: string;
  cursorPointer?: boolean;
}

export const BottomCardContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 72px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor && backgroundColor};
  margin: ${({ margin }) => margin && margin};
  cursor: ${({ cursorPointer }) => cursorPointer && "pointer"};
  border-radius: 8px;

  .first {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    img {
      height: 100%;
      width: auto;
    }
  }

  .second {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
  }

  .third {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 100%;
  }

  .forth {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20%;
    height: 100%;
    padding-right: 16px;

    img {
      height: 100%;
      width: auto;
    }
  }
`;
