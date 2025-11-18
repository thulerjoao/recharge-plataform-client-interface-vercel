import Text from "@4miga/design-system/components/Text";
import { DailyTrendType } from "types/dashboardTypes";
import { DailyTrendContainer, VerticalBar } from "./style";

interface DailyTrendProps {
  dailyTrend: DailyTrendType[];
}

const DailyTrend = ({ dailyTrend }: DailyTrendProps) => {
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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("pt-BR", { month: "short" });
    return `${day} ${month}`;
  };

  // Sort by date (oldest first)
  const sortedTrend = [...dailyTrend].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Limit to 7 most recent days for better visualization
  const displayTrend = sortedTrend.slice(-7);

  return (
    <DailyTrendContainer>
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
            <div key={index} className="vertical">
              <VerticalBar heightinpercent={heightPercent} />
              <Text margin="7px 0" fontName="SMALL">
                {formatDate(item.date)}
              </Text>
            </div>
          );
        })}
      </div>
    </DailyTrendContainer>
  );
};

export default DailyTrend;
