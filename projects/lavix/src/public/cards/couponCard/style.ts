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
  cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};


  .expiredOverlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.refused}99;
    border: 1px solid ${({ theme }) => theme.refused};
    border-radius: 24px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      position: absolute;
      bottom: -5px;
      background-color: ${({ theme }) => theme.refused};
      width: auto;
      padding: 3px 12px 1px 12px;
      border-radius: 24px;
    }
  }

  .logo {
    position: absolute;
    top: 0;
    left: -2px;
    width: auto;
    height: 100%;
    border-right: 2px dotted ${({ theme }) => theme.text_02};
    padding-right: 15px;
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
    background-color: ${({ theme }) => theme.background_04};
    border-radius: 0 0 24px 24px;
    width: calc(100% - 85px);
  
  }
  }

  
`;
