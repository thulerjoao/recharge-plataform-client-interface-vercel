import styled from "styled-components";

export const LineDetail = styled.span`
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
  position: relative;

  .verticalLines {
    height: 300px;
    width: calc(100% - 99px);
    max-width: 465px;
    position: absolute;
    top: 0px;
    border-left: 1px solid #66767a;
    border-right: 1px solid #66767a;
  }

  .horizontalLine {
    position: absolute;
    top: 40px;
    width: 100%;
    border-bottom: 1px solid #66767a;
  }

  .boldLittleLines {
    width: calc(100% - 95px);
    max-width: 469px;
    height: 24px;
    position: absolute;
    top: 31px;
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

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;
