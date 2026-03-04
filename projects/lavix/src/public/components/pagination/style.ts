import styled from "styled-components";

interface Props {
  totalPages: number;
}

export const PaginationContainer = styled.div<Props>`
  display: flex;
  width: 100%;
  max-width: 270px;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;

  ${(item) => item.totalPages === 2 && "width: 100px"};
  ${(item) => item.totalPages === 3 && "width: 170px"};

  p {
    margin: 0 16px;
    cursor: pointer;
  }

  .dots {
    cursor: default;
    margin: 0;
  }
`;
