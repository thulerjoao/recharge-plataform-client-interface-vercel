import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 48px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${({ theme }) => theme.background_03};
  z-index: 1001;

  .centerComponent {
    width: 100%;
    height: 100%;
    max-width: 85.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    position: relative;

    .mainLogo {
      cursor: pointer;
    }

    .loginContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .loginButton {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 8px;
        padding-right: 8px;
        height: 28px;
        border-radius: 8px;
        margin-right: 2px;

        &:hover {
          background-color: ${({ theme }) => theme.background_01};
        }
      }
      .getIn {
        margin-right: 8px;
      }
    }
    .name {
      cursor: pointer;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .centerComponent {
      padding: 0 24px;
    }
  }
  @media (max-width: 767px) {
    .centerComponent {
      padding: 0 16px;
    }
  }
`;

export const MenuComponent = styled.div`
  position: absolute;
  right: 28px;
  top: 52px;
  background-color: ${({ theme }) => theme.background_02};
  width: 13rem;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border_01}80;

  .square {
    height: 16px;
    width: 16px;
    background-color: ${({ theme }) => theme.background_02};
    position: absolute;
    top: -8px;
    right: 16px;
    transform: rotate(45deg);
    border-top: 1px solid ${({ theme }) => theme.border_01}80;
    border-left: 1px solid ${({ theme }) => theme.border_01}80;
  }
  .menuOption {
    width: 100%;
  }

  div {
    width: 1rem;
    cursor: pointer;
    margin-top: 8px;
    display: flex;
    align-items: center;

    span {
      width: 40px;
    }

    svg {
      width: 60px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    right: 12px;
  }
  @media (max-width: 767px) {
    right: 4px;
  }
`;
