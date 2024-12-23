import styled from "styled-components";

export const ContactContainer = styled.section`
  display: flex;
  margin-top: 56px;
  margin-bottom: 56px;

  div {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;

      figure {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .socialMedia {
        margin: 0 8px;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    /* flex-direction: column;

    .topDiv {
      margin-bottom: 32px;
    } */
  }
  @media (max-width: 767px) {
    flex-direction: column;
    .topDiv {
      margin-bottom: 32px;
    }
  }
`;
