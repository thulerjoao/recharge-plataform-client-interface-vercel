import styled from "styled-components";

export const MainGamesContainer = styled.section`
  margin-top: 24px;
  position: relative;
  height: 268px;

  .list {
    margin-right: 16px;
    display: flex;
    position: absolute;
    max-width: calc(100% + 16px);
    overflow-x: auto;
    top: 0;
    left: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .newCardContainer {
      margin-right: 24px;
    }
  }
`;
