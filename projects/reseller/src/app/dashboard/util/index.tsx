"use client";

import Text from "@4miga/design-system/components/Text";
import Button from "@4miga/design-system/components/button";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import LoadingPage from "app/loading";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useRef, useState } from "react";
import { DashboardDataType, PeriodType } from "types/dashboardTypes";
import CronHealthIndicator from "../common/components/cronHealthIndicator";
import DailyTrend from "../common/components/dailyTrend";
import MetricsCards from "../common/components/metricsCards";
import PeriodSelector from "../common/components/periodSelector";
import SalesByPackage from "../common/components/salesByPackage";
import { DashboardContainer } from "./style";

// Initial period (current month)
const getCurrentPeriod = (): PeriodType => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  return {
    type: `${year}-${String(month).padStart(2, "0")}`,
    year,
    month,
    startDate: `${year}-${String(month).padStart(2, "0")}-01`,
    endDate: `${year}-${String(month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`,
  };
};

// Convert PeriodType to API format ("YYYY-MM" or "current_month")
const getPeriodParam = (period: PeriodType): string => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Se for o mês atual, retorna "current_month"
  if (period.year === currentYear && period.month === currentMonth) {
    return "current_month";
  }

  // Caso contrário, retorna "YYYY-MM"
  return `${period.year}-${String(period.month).padStart(2, "0")}`;
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodType>(getCurrentPeriod());
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [recalculating, setRecalculating] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [firstAvailablePeriod, setFirstAvailablePeriod] = useState<{
    year: number;
    month: number;
    period: string;
  } | null>(null);
  const hasAdjustedPeriod = useRef(false);

  // Função para buscar dados do dashboard
  const fetchDashboardData = async (period: PeriodType) => {
    try {
      setLoading(true);
      setError(null);
      const periodParam = getPeriodParam(period);
      const response = await connectionAPIGet<DashboardDataType>(
        `/metrics/dashboard?period=${periodParam}`,
        apiUrl,
      );

      setDashboardData(response);

      // Atualizar firstAvailablePeriod se ainda não foi ajustado
      if (response.firstAvailablePeriod && !hasAdjustedPeriod.current) {
        setFirstAvailablePeriod(response.firstAvailablePeriod);

        // Ajustar período se necessário
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        let adjustedPeriod = { ...period };

        // Se selected year é antes do primeiro disponível
        if (period.year < response.firstAvailablePeriod.year) {
          adjustedPeriod = {
            ...period,
            year: response.firstAvailablePeriod.year,
            month: response.firstAvailablePeriod.month,
          };
        }
        // Se é o primeiro ano e mês é antes do primeiro disponível
        else if (
          period.year === response.firstAvailablePeriod.year &&
          period.month < response.firstAvailablePeriod.month
        ) {
          adjustedPeriod = {
            ...period,
            month: response.firstAvailablePeriod.month,
          };
        }
        // Se ano é futuro ou mês é futuro
        else if (
          period.year > currentYear ||
          (period.year === currentYear && period.month > currentMonth)
        ) {
          adjustedPeriod = {
            ...period,
            year: currentYear,
            month: currentMonth,
          };
        }

        // Recalcular datas se período foi ajustado
        if (
          adjustedPeriod.year !== period.year ||
          adjustedPeriod.month !== period.month
        ) {
          const daysInMonth = new Date(
            adjustedPeriod.year,
            adjustedPeriod.month,
            0,
          ).getDate();
          adjustedPeriod.startDate = `${adjustedPeriod.year}-${String(adjustedPeriod.month).padStart(2, "0")}-01`;
          adjustedPeriod.endDate = `${adjustedPeriod.year}-${String(adjustedPeriod.month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
          adjustedPeriod.type = `${adjustedPeriod.year}-${String(adjustedPeriod.month).padStart(2, "0")}`;
          setSelectedPeriod(adjustedPeriod);
          hasAdjustedPeriod.current = true;
          // Recarregar dados com período ajustado
          await fetchDashboardData(adjustedPeriod);
          return;
        } else {
          hasAdjustedPeriod.current = true;
        }
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Erro ao carregar dados do dashboard. Tente novamente.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Buscar dados quando o período muda
  useEffect(() => {
    fetchDashboardData(selectedPeriod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod]);

  // Função para recalcular métricas
  const handleRecalculate = async () => {
    if (!dashboardData) return;

    try {
      setRecalculating(true);
      setError(null);
      const periodParam = getPeriodParam(selectedPeriod);
      const response = await connectionAPIPost<DashboardDataType>(
        `/metrics/recalculate`,
        { period: periodParam },
        apiUrl,
      );

      setDashboardData(response);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Erro ao recalcular métricas. Tente novamente.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setRecalculating(false);
    }
  };

  // Função para refresh (atualizar métricas em tempo real)
  // const handleRefresh = async () => {
  //   try {
  //     setRefreshing(true);
  //     setError(null);
  //     const response = await connectionAPIPost<DashboardDataType>(
  //       `/metrics/refresh`,
  //       {},
  //       apiUrl,
  //     );

  //     setDashboardData(response);
  //   } catch (err: any) {
  //     const errorMessage =
  //       err?.response?.data?.message ||
  //       "Erro ao atualizar métricas. Tente novamente.";
  //     setError(errorMessage);
  //     alert(errorMessage);
  //   } finally {
  //     setRefreshing(false);
  //   }
  // };

  const handlePeriodChange = (period: PeriodType) => {
    hasAdjustedPeriod.current = false; // Reset flag ao mudar período manualmente
    setSelectedPeriod(period);
  };

  const formatPeriod = () => {
    if (!dashboardData?.period) return "";
    const { month, year } = dashboardData.period;
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${monthNames[month - 1]} ${year}`;
  };

  if (loading && !dashboardData) {
    return <LoadingPage />;
  }

  if (!dashboardData) {
    return (
      <DashboardContainer>
        <div className="centerContainer">
          <Text fontName="LARGE_SEMI_BOLD">
            {error || "Nenhum dado disponível"}
          </Text>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="centerContainer">
        <div className="desktop">
          <HeaderEnviroment>
            <DefaultHeader title="DASHBOARD" />
          </HeaderEnviroment>
        </div>
        <div className="mobile mobileHeader">
          <Text align="center" fontName="LARGE_SEMI_BOLD">
            DASHBOARD
          </Text>
        </div>
        <div className="header">
          <CronHealthIndicator
            cronHealthStatus={dashboardData.cronHealthStatus}
            onRecalculate={handleRecalculate}
            recalculating={recalculating}
          />
          <div className="headerTop">
            <Text fontName="LARGE_SEMI_BOLD">Performance da loja</Text>
            <div className="headerControls">
              <PeriodSelector
                period={selectedPeriod}
                firstAvailablePeriod={firstAvailablePeriod || undefined}
                onPeriodChange={handlePeriodChange}
              />
            </div>
          </div>
          {dashboardData.period && (
            <Text
              margin="8px 0 0 0"
              fontName="REGULAR"
              color={Theme.colors.secondaryText}
            >
              Período: {formatPeriod()}
            </Text>
          )}
        </div>
        <section className="bottomContainer">
          {(() => {
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth() + 1;
            const isCurrentMonth =
              selectedPeriod.year === currentYear &&
              selectedPeriod.month === currentMonth;

            return isCurrentMonth ? (
              <DailyTrend dailyTrend={dashboardData.dailyTrend} />
            ) : null;
          })()}
          {/* <SalesByProduct salesByProduct={dashboardData.salesByProduct} /> */}
        </section>
        <Text fontName="LARGE_SEMI_BOLD" margin="0 0 24px 0">
          Resumo do mês
        </Text>
        <MetricsCards summary={dashboardData.summary} />
        {dashboardData.salesByPackage &&
          dashboardData.salesByPackage.length > 0 && (
            <SalesByPackage salesByPackage={dashboardData.salesByPackage} />
          )}
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
