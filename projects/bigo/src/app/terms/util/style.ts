import styled from "styled-components";

export const TermsContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 48px - 238px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;

  .content-wrapper {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .section {
    width: 100%;
    margin-bottom: 32px;
  }

  .definitions-list,
  .ordered-list {
    width: 100%;
    margin: 16px 0;
    padding-left: 24px;
    color: ${({ theme }) => theme.text_01};

    li {
      margin-bottom: 12px;
      line-height: 1.6;
      color: ${({ theme }) => theme.text_01};

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .ordered-list {
    list-style-type: decimal;
    padding-left: 32px;

    .nested-list {
      list-style-type: disc;
      margin-top: 8px;
      margin-bottom: 8px;
      padding-left: 24px;
      color: ${({ theme }) => theme.text_01};

      li {
        margin-bottom: 8px;
        color: ${({ theme }) => theme.text_01};
      }
    }
  }

  .definitions-list {
    list-style-type: disc;
  }

  .email-link {
    color: ${({ theme }) => theme.text_01};
    text-decoration: underline;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .last-update {
    width: 100%;
    text-align: right;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid ${({ theme }) => theme.background_03};
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 60px 40px;

    .content-wrapper {
      max-width: 800px;
    }
  }

  @media (max-width: 767px) {
    padding: 40px 16px;
    min-height: calc(100vh - 48px - 300px);

    .content-wrapper {
      max-width: 100%;
    }

    .definitions-list,
    .ordered-list {
      padding-left: 20px;
    }

    .ordered-list {
      padding-left: 24px;
    }

    .last-update {
      text-align: center;
      margin-top: 32px;
    }
  }
`;
