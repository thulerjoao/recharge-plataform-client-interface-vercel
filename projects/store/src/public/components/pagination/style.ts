import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 270px;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;

  p {
    margin: 0 16px;
    cursor: pointer;
  }

  .dots {
    cursor: default;
    margin: 0;
  }
`;
