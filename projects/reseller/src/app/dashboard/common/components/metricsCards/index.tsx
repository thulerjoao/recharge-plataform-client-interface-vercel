import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
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
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Total de Vendas
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          R$ {formatPrice(summary.totalSales)}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Diamantes Vendidos
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {new Intl.NumberFormat("pt-BR").format(
            summary.totalDiamondsSold ?? 0,
          )}{" "}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Total de Pedidos
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Pedidos Concluídos
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalCompletedOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Ticket Médio
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          R$ {formatPrice(summary.averageTicket)}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Total de Clientes
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.totalCustomers}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Novos Clientes
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.newCustomers}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Pedidos com Cupom
        </Text>
        <Text margin="8px 0 0 0" fontName="LARGE_SEMI_BOLD">
          {summary.ordersWithCoupon}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Pedidos Expirados
        </Text>
        <Text
          margin="8px 0 0 0"
          fontName="LARGE_SEMI_BOLD"
          color={Theme.colors.refused}
        >
          {summary.totalExpiredOrders}
        </Text>
      </div>

      <div className="metricCard">
        <Text fontName="REGULAR" color={Theme.colors.secondaryTextAction}>
          Pedidos Reembolsados
        </Text>
        <Text
          margin="8px 0 0 0"
          fontName="LARGE_SEMI_BOLD"
          color={Theme.colors.refused}
        >
          {summary.totalRefundedOrders}
        </Text>
      </div>
    </MetricsCardsContainer>
  );
};

export default MetricsCards;
