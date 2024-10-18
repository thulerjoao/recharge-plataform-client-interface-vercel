import styled from "styled-components";

export const LineDetail = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 0;
  width: 0;
  z-index: -1;

  .verticalLines {
    height: 300px;
    width: 465px;
    position: absolute;
    top: 376px;
    border-left: 1px solid #66767a;
    border-right: 1px solid #66767a;
  }
  .horizontalLine {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 440px;
    border-bottom: 1px solid #66767a;
  }
  .boldLittleLines {
    width: 470px;
    height: 24px;
    position: absolute;
    top: 430px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      height: 100%;
      width: 5px;
      background-color: white;
      border-radius: 2.5px;
    }
  }
`;
