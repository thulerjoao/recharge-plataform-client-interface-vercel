import styled from "styled-components";

export const CardContainer = styled.article`
  background: rgb(77, 207, 240);
  background: linear-gradient(
    180deg,
    rgba(54, 149, 173, 1) 30%,
    rgba(9, 22, 26, 1) 100%
  );
  -webkit-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 0px rgba(7, 29, 35, 1);
  height: 231px;
  width: 174px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  figure {
    height: 178px;
    width: 100%;
  }
`;
