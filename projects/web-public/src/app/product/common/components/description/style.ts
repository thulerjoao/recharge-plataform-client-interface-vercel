import styled from "styled-components";

export const DescriptionContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  img {
    object-fit: contain;
    width: 100%;
    max-width: 628px;
    height: auto;
  }

  .instructions {
    width: 100%;
    max-width: 496px;
  }
`;
