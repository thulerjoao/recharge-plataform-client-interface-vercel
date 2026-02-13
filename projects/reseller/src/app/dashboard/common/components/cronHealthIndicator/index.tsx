"use client";

import { useState } from "react";
import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import { useTheme } from "styled-components";
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
  const theme = useTheme();
  const isHealthy = cronHealthStatus === "OK";

  return (
    <CronHealthIndicatorContainer $isHealthy={isHealthy}>
      <div className="statusContent">
        <div className="statusCircle">
          <span className="statusIcon">{isHealthy ? "✓" : "⚠"}</span>
        </div>
        <div className="statusText">
          <Text
            nowrap={true}
            fontName="REGULAR"
            color={isHealthy ? theme.approved : theme.refused}
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
    </CronHealthIndicatorContainer>
  );
};

export default CronHealthIndicator;
