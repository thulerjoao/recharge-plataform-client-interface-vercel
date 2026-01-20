import Text from "@4miga/design-system/components/Text";
import React, { useEffect, useRef, useState } from "react";
import { DailyTrendType } from "types/dashboardTypes";
import { formatPrice } from "utils/formatPrice";
import { DailyTrendContainer, Tooltip, VerticalBar } from "./style";

interface DailyTrendProps {
  dailyTrend: DailyTrendType[];
}

const DailyTrend = ({ dailyTrend }: DailyTrendProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        window.innerWidth <= 767
      ) {
        setHoveredIndex(null);
        setTooltipPosition(null);
      }
    };

    if (hoveredIndex !== null && window.innerWidth <= 767) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [hoveredIndex]);

  if (!dailyTrend || dailyTrend.length === 0) {
    return (
      <DailyTrendContainer>
        <Text fontName="LARGE_SEMI_BOLD">Tendência Diária</Text>
        <Text margin="24px 0 0 0" fontName="REGULAR" color="#999">
          Nenhum dado disponível
        </Text>
      </DailyTrendContainer>
    );
  }

  // Calculate maximum value to normalize bars
  const maxSales = Math.max(...dailyTrend.map((item) => item.totalSales), 1);

  // Format dates for display (day only)
  //"date": "2026-01-19"
  const formatDate = (dateString: string) => {
    // Parse the date string manually to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    // Create date in Brasília timezone by using toLocaleString
    const date = new Date(year, month - 1, day);
    const dayFormatted = date.getDate();
    const monthFormatted = date.toLocaleDateString("pt-BR", {
      month: "short",
      timeZone: "America/Sao_Paulo",
    });
    return `${dayFormatted} ${monthFormatted}`;
  };

  // Sort by date (oldest first)
  const sortedTrend = [...dailyTrend].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Limit to 7 most recent days for better visualization
  const displayTrend = sortedTrend.slice(-7);

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setHoveredIndex(index);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredIndex !== null) {
      setTooltipPosition({
        x: event.clientX,
        y: event.currentTarget.getBoundingClientRect().top - 10,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPosition(null);
  };

  // Handle touch/click for mobile
  const handleTouchStart = (
    index: number,
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = event.currentTarget.getBoundingClientRect();

    // If clicking the same bar, close tooltip
    if (hoveredIndex === index) {
      setHoveredIndex(null);
      setTooltipPosition(null);
      return;
    }

    setHoveredIndex(index);
    setTooltipPosition({
      x: touch.clientX,
      y: rect.top - 10,
    });
  };

  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    // For mobile/tablet, toggle tooltip on click
    if (window.innerWidth <= 767) {
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();

      // If clicking the same bar, close tooltip
      if (hoveredIndex === index) {
        setHoveredIndex(null);
        setTooltipPosition(null);
        return;
      }

      setHoveredIndex(index);
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
  };

  return (
    <DailyTrendContainer ref={containerRef}>
      <Text fontName="LARGE_SEMI_BOLD">Tendência Diária</Text>
      <div className="graphics">
        <div className="vertical metrics">
          <Text fontName="SMALL">R$ {Math.ceil(maxSales / 1000)}k</Text>
          <Text fontName="SMALL">
            R$ {Math.ceil((maxSales * 0.75) / 1000)}k
          </Text>
          <Text fontName="SMALL">R$ {Math.ceil((maxSales * 0.5) / 1000)}k</Text>
          <Text fontName="SMALL">
            R$ {Math.ceil((maxSales * 0.25) / 1000)}k
          </Text>
          <Text fontName="SMALL">R$ 0</Text>
        </div>
        {displayTrend.map((item, index) => {
          const heightPercent = (item.totalSales / maxSales) * 100;
          return (
            <div
              key={index}
              className="vertical"
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleClick(index, e)}
              onTouchStart={(e) => handleTouchStart(index, e)}
            >
              <VerticalBar heightinpercent={heightPercent} />
              <Text margin="7px 0" fontName="SMALL">
                {formatDate(item.date)}
              </Text>
            </div>
          );
        })}
      </div>
      {hoveredIndex !== null && tooltipPosition && (
        <Tooltip
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        >
          <Text fontName="SMALL_MEDIUM">
            R$ {formatPrice(displayTrend[hoveredIndex].totalSales)}
          </Text>
          <Text margin="4px 0 0 0" fontName="SMALL" color="#999">
            {displayTrend[hoveredIndex].totalOrders} pedidos
          </Text>
          <Text margin="4px 0 0 0" fontName="SMALL" color="#999">
            +{displayTrend[hoveredIndex].newCustomers} clientes
          </Text>
        </Tooltip>
      )}
    </DailyTrendContainer>
  );
};

export default DailyTrend;
