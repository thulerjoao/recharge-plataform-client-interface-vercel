import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 270px;
  flex-direction: row;
  justify-content: center;
  margin-top: 28px;
  margin-bottom: 56px;

  p {
    margin: 0 16px;
    cursor: pointer;
  }

  .dots {
    cursor: default;
  }
`;
