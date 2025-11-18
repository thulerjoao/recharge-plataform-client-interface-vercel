"use client";

import Text from "@4miga/design-system/components/Text";
import { useEffect, useRef, useState } from "react";
import { DashboardDataType, PeriodType } from "types/dashboardTypes";
import DailyTrend from "../common/components/dailyTrend";
import MetricsCards from "../common/components/metricsCards";
import PeriodSelector from "../common/components/periodSelector";
import SalesByProduct from "../common/components/salesByProduct";
import { DashboardContainer } from "./style";
import HeaderEnviroment from "public/components/headerEnviroment";
import DefaultHeader from "public/components/defaultHeader";

// Function to generate mock data based on the period
const generateMockData = (
  period: PeriodType,
  firstAvailablePeriod: { year: number; month: number; period: string },
): DashboardDataType => {
  // Data variation based on month/year to simulate different periods
  const variation = period.year * 100 + period.month;
  const baseMultiplier = 1 + (variation % 10) * 0.1;

  // Generate dates for the period
  const daysInMonth = new Date(period.year, period.month, 0).getDate();
  const dailyTrend = [];
  for (let i = daysInMonth; i > Math.max(0, daysInMonth - 7); i--) {
    const date = new Date(period.year, period.month - 1, i);
    dailyTrend.push({
      date: date.toISOString().split("T")[0],
      totalSales: (2000 + Math.random() * 1500) * baseMultiplier,
      totalOrders: Math.floor(15 + Math.random() * 15),
    });
  }

  return {
    period,
    summary: {
      totalSales: 50000.0 * baseMultiplier,
      totalOrders: Math.floor(150 * baseMultiplier),
      totalCompletedOrders: Math.floor(140 * baseMultiplier),
      totalExpiredOrders: Math.floor(5 * baseMultiplier),
      totalRefundedOrders: Math.floor(5 * baseMultiplier),
      averageTicket: 357.14 * baseMultiplier,
      totalCustomers: Math.floor(120 * baseMultiplier),
      newCustomers: Math.floor(30 * baseMultiplier),
      ordersWithCoupon: Math.floor(80 * baseMultiplier),
      ordersWithoutCoupon: Math.floor(70 * baseMultiplier),
    },
    dailyTrend: dailyTrend.reverse(),
    salesByProduct: [
      {
        productId: "prod-123",
        productName: "Bigo Live Coins",
        imgCardUrl:
          "https://storage.example.com/store/store-123/product/prod-123/card/card.png",
        totalSales: 30000.0 * baseMultiplier,
        totalOrders: Math.floor(90 * baseMultiplier),
        percentage: 60.0,
      },
      {
        productId: "prod-456",
        productName: "Free Fire Diamonds",
        imgCardUrl: "https://storage.example.com/product/prod-456/card.png",
        totalSales: 20000.0 * baseMultiplier,
        totalOrders: Math.floor(60 * baseMultiplier),
        percentage: 40.0,
      },
    ],
    firstAvailablePeriod,
  };
};

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

// Mocked first available period (based on example)
const mockFirstAvailablePeriod = {
  year: 2023,
  month: 1,
  period: "2023-01",
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodType>(getCurrentPeriod());
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [firstAvailablePeriod, setFirstAvailablePeriod] = useState(
    mockFirstAvailablePeriod,
  );
  const hasAdjustedPeriod = useRef(false);

  useEffect(() => {
    // Simulate loading delay when changing period
    setLoading(true);
    const timer = setTimeout(() => {
      const mockData = generateMockData(selectedPeriod, firstAvailablePeriod);
      setDashboardData(mockData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedPeriod]);

  // Update firstAvailablePeriod only once when data arrives
  useEffect(() => {
    if (dashboardData?.firstAvailablePeriod && !hasAdjustedPeriod.current) {
      const newFirstAvailable = dashboardData.firstAvailablePeriod;
      setFirstAvailablePeriod(newFirstAvailable);

      // Adjust selected period if it's outside the available range
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      let adjustedPeriod = { ...selectedPeriod };

      // If selected year is before the first available
      if (selectedPeriod.year < newFirstAvailable.year) {
        adjustedPeriod = {
          ...selectedPeriod,
          year: newFirstAvailable.year,
          month: newFirstAvailable.month,
        };
      }
      // If it's the first year and month is before the first available
      else if (
        selectedPeriod.year === newFirstAvailable.year &&
        selectedPeriod.month < newFirstAvailable.month
      ) {
        adjustedPeriod = {
          ...selectedPeriod,
          month: newFirstAvailable.month,
        };
      }
      // If year is future or month is future
      else if (
        selectedPeriod.year > currentYear ||
        (selectedPeriod.year === currentYear &&
          selectedPeriod.month > currentMonth)
      ) {
        adjustedPeriod = {
          ...selectedPeriod,
          year: currentYear,
          month: currentMonth,
        };
      }

      // Recalculate dates if period was adjusted
      if (
        adjustedPeriod.year !== selectedPeriod.year ||
        adjustedPeriod.month !== selectedPeriod.month
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
      } else {
        hasAdjustedPeriod.current = true;
      }
    }
  }, [dashboardData?.firstAvailablePeriod, selectedPeriod]);

  const handlePeriodChange = (period: PeriodType) => {
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

  if (loading) {
    return (
      <DashboardContainer>
        <Text fontName="LARGE_SEMI_BOLD">Carregando dashboard...</Text>
      </DashboardContainer>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardContainer>
        <Text fontName="LARGE_SEMI_BOLD">Nenhum dado disponível</Text>
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
        <div className="header">
          <div className="headerTop">
            <Text fontName="LARGE_SEMI_BOLD">Performance da loja</Text>
            <PeriodSelector
              period={selectedPeriod}
              firstAvailablePeriod={firstAvailablePeriod}
              onPeriodChange={handlePeriodChange}
            />
          </div>
          {dashboardData.period && (
            <Text margin="8px 0 0 0" fontName="REGULAR" color="#999">
              Período: {formatPeriod()}
            </Text>
          )}
        </div>
        <section className="bottomContainer">
          <DailyTrend dailyTrend={dashboardData.dailyTrend} />
          <SalesByProduct salesByProduct={dashboardData.salesByProduct} />
        </section>
        <MetricsCards summary={dashboardData.summary} />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
