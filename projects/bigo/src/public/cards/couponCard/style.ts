import { Theme } from "@4miga/design-system/theme/theme";
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
    background-color: ${Theme.colors.refused}80;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    mask: linear-gradient(black, black),
      radial-gradient(circle 12px at 0px 50%, black 12px, transparent 12px),
      radial-gradient(circle 12px at 100% 50%, black 12px, transparent 12px);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(black, black),
      radial-gradient(circle 12px at 0px 50%, black 12px, transparent 12px),
      radial-gradient(circle 12px at 100% 50%, black 12px, transparent 12px);
    -webkit-mask-composite: xor;
    mask-size:
      100% 100%,
      100% 100%,
      100% 100%;
    -webkit-mask-size:
      100% 100%,
      100% 100%,
      100% 100%;

    p {
      transform: rotate(-6deg);
      border: 3px solid ${Theme.colors.refused}60;
      width: 80%;
      max-width: 340px;
      padding: 8px 16px;
    }
  }

  .topSection {
    width: 100%;
    height: 40px;
    background-color: ${Theme.colors.couponsBackground};
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 6px;
    z-index: 3;

    h3 {
      text-shadow: 0 0 10px ${Theme.colors.maindark}80;
    }
  }

  .middleSection {
    height: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    background-color: transparent;
    justify-content: center;

    .leftBall {
      position: absolute;
      left: 0px;
      width: 24px;
      height: 24px;
      z-index: 2;

      .leftSquare {
        position: absolute;
        left: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background-color: ${Theme.colors.couponsBackground};
        mask: radial-gradient(
          circle 12px at 0% 50%,
          transparent 12px,
          black 12px
        );
        -webkit-mask: radial-gradient(
          circle 12px at 0% 50%,
          transparent 12px,
          black 12px
        );
      }
    }

    .centerComponent {
      flex: 1;
      max-width: calc(100% - 24px - 24px);
      background-color: ${Theme.colors.couponsBackground};
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .line {
        height: 0px;
        width: 100%;
        border-top: 1px dotted ${Theme.colors.maindark};
      }
    }

    .rightBall {
      position: absolute;
      right: 0px;
      width: 24px;
      height: 24px;
      z-index: 2;

      .rightSquare {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 24px;
        background-color: ${Theme.colors.couponsBackground};
        mask: radial-gradient(
          circle 12px at 100% 50%,
          transparent 12px,
          black 12px
        );
        -webkit-mask: radial-gradient(
          circle 12px at 100% 50%,
          transparent 12px,
          black 12px
        );
      }
    }
  }
  .bottomSection {
    width: 100%;
    height: 40px;
    background-color: ${Theme.colors.couponsBackground};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 24px;
    padding-bottom: 12px;
  }
`;
