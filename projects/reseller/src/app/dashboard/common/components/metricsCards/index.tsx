import Text from "@4miga/design-system/components/Text";
import { DashboardSummaryType } from "types/dashboardTypes";
import { formatPrice } from "utils/formatPrice";
import { MetricsCardsContainer } from "./style";

interface MetricsCardsProps {
  summary: DashboardSummaryType;
}

const MetricsCards = ({ summary }: MetricsCardsProps) => {
  return (
    <MetricsCardsContainer>
      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Total de Vendas
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          R$ {formatPrice(summary.totalSales)}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Total de Pedidos
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Pedidos Concluídos
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalCompletedOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Ticket Médio
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          R$ {formatPrice(summary.averageTicket)}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Total de Clientes
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalCustomers}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Novos Clientes
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.newCustomers}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Pedidos com Cupom
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.ordersWithCoupon}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Pedidos Expirados
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD" color="#f44336">
          {summary.totalExpiredOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color="#999">
          Pedidos Reembolsados
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD" color="#f44336">
          {summary.totalRefundedOrders}
        </Text>
      </div>
    </MetricsCardsContainer>
  );
};

export default MetricsCards;
