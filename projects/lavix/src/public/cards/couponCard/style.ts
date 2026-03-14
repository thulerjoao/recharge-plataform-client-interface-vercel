import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export const CouponCardContainer = styled.article<Props>`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  height: auto;
  position: relative;
  overflow: visible;
  filter: ${({ isActive }) =>
    isActive ? `drop-shadow(0px 0px 5px rgb(14, 67, 82))` : "none"};
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
  overflow: hidden;

  .expiredOverlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.refused}80;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    p {
      transform: rotate(-6deg);
      border: 3px solid ${({ theme }) => theme.refused}60;
      width: 80%;
      max-width: 340px;
      padding: 8px 16px;
    }
  }

  .logo {
    position: absolute;
    top: 0;
    left: -3px;
    width: auto;
    height: 100%;
    border-right: 2px dotted ${({ theme }) => theme.text_02};
    padding-right: 16px;
  }

  .content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.background_05};
    border-radius: 24px;
    align-items: end;
    padding: 8px 16px 8px 0px;

    .topSection {
    width: 100%;
    height: 38px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 6px;
    padding-left: 32px;
    background-color: ${({ theme }) => theme.background_04};
    border-radius: 24px 24px 0 0;
    width: calc(100% - 85px);


    h3 {
      text-shadow: 0 0 10px ${({ theme }) => theme.background_01}80;
    }
  }

  .bottomSection {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 64px;
    background-color: ${({ theme }) => theme.background_04};
    border-radius: 0 0 24px 24px;
    width: calc(100% - 85px);
  
  }
  }

  
`;
