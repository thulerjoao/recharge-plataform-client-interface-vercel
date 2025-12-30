"use client";

import { useState } from "react";
import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import { Theme } from "@4miga/design-system/theme/theme";
import { CronHealthIndicatorContainer } from "./style";

interface CronHealthIndicatorProps {
  cronHealthStatus?: string;
  onRecalculate: () => void;
  recalculating?: boolean;
}

const CronHealthIndicator = ({
  cronHealthStatus,
  onRecalculate,
  recalculating = false,
}: CronHealthIndicatorProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isHealthy = cronHealthStatus === "OK";

  return (
    <CronHealthIndicatorContainer
      $isHealthy={isHealthy}
      onMouseEnter={() => isHealthy && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="statusContent">
        <div className="statusCircle">
          <span className="statusIcon">{isHealthy ? "✓" : "⚠"}</span>
        </div>
        <div className="statusText">
          <Text
            nowrap={true}
            fontName="REGULAR"
            color={isHealthy ? Theme.colors.approved : Theme.colors.refused}
          >
            {isHealthy
              ? "Métricas saudáveis"
              : "Alerta de inconsistência nas métricas"}
          </Text>
        </div>
      </div>
      {!isHealthy && (
        <Button
          title="Recalcular"
          loading={recalculating}
          onClick={onRecalculate}
          disabled={recalculating}
          height={28}
          width={120}
        />
      )}
      {isHealthy && showTooltip && (
        <div className="tooltip">
          <Text fontName="SMALL" color={Theme.colors.mainlight}>
            As métricas são atualizadas automaticamente às 5h da manhã
          </Text>
        </div>
      )}
    </CronHealthIndicatorContainer>
  );
};

export default CronHealthIndicator;
