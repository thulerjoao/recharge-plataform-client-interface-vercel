import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SettingsContainer = styled.div`
  width: 100%;
  max-width: 85.5rem;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  .settings-header {
    width: 100%;
    max-width: 780px;
    text-align: center;
    margin-bottom: 48px;

    h1 {
      margin-bottom: 16px;
      color: ${Theme.colors.mainlight};
    }

    p {
      color: ${Theme.colors.mainlight};
      opacity: 0.8;
    }
  }

  .settings-form {
    width: 100%;
    max-width: 780px;
    min-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    .form-section {
      width: 100%;
      background-color: ${Theme.colors.maindark};
      border-radius: 12px;
      padding: 24px;
      border: 1px solid ${Theme.colors.mainTransparent};
      -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
      box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);

      .section-title {
        margin-bottom: 24px;
        color: ${Theme.colors.mainlight};
        border-bottom: 1px solid ${Theme.colors.mainTransparent};
        padding-bottom: 12px;
      }

      .input-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        label {
          font-size: 14px;
          font-weight: 600;
          color: ${Theme.colors.mainlight};
          margin-bottom: 8px;
          display: block;
        }

        input:disabled {
          color: ${Theme.colors.mainlight} !important;
          -webkit-text-fill-color: ${Theme.colors.mainlight} !important;
          opacity: 1 !important;
        }

        select {
          width: 100%;
          padding: 12px 16px;
          padding-right: 40px;
          border: 2px solid ${Theme.colors.mainTransparent};
          border-radius: 8px;
          background-color: ${Theme.colors.mainBbackgroundSolid};
          color: ${Theme.colors.mainlight};
          font-size: 14px;
          transition: all 0.2s ease;
          box-sizing: border-box;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;

          &:focus {
            outline: none;
            border-color: ${Theme.colors.mainlight};
            box-shadow: 0 0 0 3px ${Theme.colors.mainTransparent}40;
          }

          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        }

        .error-message {
          color: ${Theme.colors.pending};
          font-size: 12px;
          margin-top: 6px;
          display: block;
          animation: fadeIn 0.2s ease;
        }

        p {
          margin-top: 6px;
          font-size: 12px;
          color: ${Theme.colors.mainlight}60;
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 16px;

      .action-buttons {
        display: flex;
        gap: 16px;
        align-items: center;
      }
    }
  }

  .support {
    width: auto;
    margin-top: 16px;
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 36px 24px 40px 24px;

    .settings-form {
      /* max-width: 620px; */
      min-width: 0;
    }
  }

  @media (max-width: 767px) {
    padding: 36px 16px 40px 16px;

    .settings-header {
      margin-bottom: 32px;
      min-width: 0;
    }

    .settings-form {
      min-width: 0;
      gap: 24px;

      .form-section {
        padding: 20px;

        .input-group {
          margin-bottom: 16px;
        }
      }

      .form-actions {
        button {
          width: 100% !important;
        }

        .action-buttons {
          flex-direction: column;
          width: 100%;
          gap: 12px;
        }
      }
    }
  }
`;
