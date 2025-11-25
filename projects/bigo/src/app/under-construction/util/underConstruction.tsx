"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { UnderConstructionContainer } from "./style";

const UnderConstruction = () => {
  return (
    <UnderConstructionContainer>
      <div className="content-wrapper">
        <div className="text-content">
          <Text
            tag="h1"
            align="center"
            fontName="BIG_SEMI_BOLD"
            color={Theme.colors.mainlight}
            margin="32px 0 16px 0"
          >
            EM CONSTRUÇÃO
          </Text>

          <Text
            tag="p"
            align="center"
            fontName="REGULAR"
            color={Theme.colors.secondaryText}
            margin="0 0 24px 0"
          >
            Estamos trabalhando para trazer a melhor experiência para você!
          </Text>

          <div className="message-box">
            <Text
              tag="p"
              align="center"
              fontName="SMALL"
              color={Theme.colors.mainlight}
              margin="0"
            >
              Nossa plataforma está em desenvolvimento e em breve estará
              disponível para compras.
            </Text>
            <Text
              tag="p"
              align="center"
              fontName="SMALL"
              color={Theme.colors.secondaryText}
              margin="16px 0 0 0"
            >
              Agradecemos sua paciência e interesse!
            </Text>
          </div>

          <div className="features-preview">
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <Text
                tag="span"
                align="center"
                fontName="SMALL"
                color={Theme.colors.secondaryText}
              >
                Segurança
              </Text>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <Text
                tag="span"
                align="center"
                fontName="SMALL"
                color={Theme.colors.secondaryText}
              >
                Rapidez
              </Text>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <Text
                tag="span"
                align="center"
                fontName="SMALL"
                color={Theme.colors.secondaryText}
              >
                Qualidade
              </Text>
            </div>
          </div>
        </div>
      </div>
    </UnderConstructionContainer>
  );
};

export default UnderConstruction;
