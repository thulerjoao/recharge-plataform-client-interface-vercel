import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${({ theme }) => theme.background_02};
  position: absolute;
  bottom: 0;

  .centerComponent {
    width: 100%;
    height: 220px;
    max-width: 55.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 80px;

    .upperComponent {
      width: 100%;
      min-height: 82px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .paymentMethods {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .paymentIcons {
          display: flex;
          justify-content: center;
          width: 170px;
          flex-wrap: wrap;
          gap: 8px;
        }
      }
    }

    .bottomComponent {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      min-height: 48px;
      margin-bottom: 8px;
      padding: 5px 0;

      .topPhrase {
        display: flex;
        align-items: start;
        justify-content: center;
        gap: 8px;
        margin-bottom: 4px;
        width: 100%;
        height: auto;
        margin-bottom: 8px;

        .termsAndConditions {
          margin-bottom: 16px;
          width: auto;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          text-align: center;
        }
        .dot {
          width: 8px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .developedBy {
          width: auto;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      .bottomPhrase {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .centerComponent {
      margin: 0 80px;

      .bottomComponent {
        margin-bottom: 16px;
      }
    }
  }
  @media (max-width: 767px) {
    .centerComponent {
      margin: 0 16px;

      .bottomComponent {
        margin-bottom: 20px;
      }
    }
  }
`;
