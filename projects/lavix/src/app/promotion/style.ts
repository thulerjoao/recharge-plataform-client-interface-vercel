import styled from "styled-components";

export const PromotionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    width: 100%;
  }
`;

export const VideoWrapper = styled.div`
  height: 65vh;
  max-width: 800px;
  position: relative;
  background-color: #000;
  border-radius: 36px !important;
  border: 10px solid black;
  box-sizing: border-box;
  box-shadow: 0 0px 10px rgba(255, 255, 255, 0.1);
  aspect-ratio: 0.5 / 1;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    object-position: center;

    &:fullscreen {
      object-fit: contain;
    }
  }

  .video-loading,
  .video-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  @media (max-width: 768px) {
  }
`;
