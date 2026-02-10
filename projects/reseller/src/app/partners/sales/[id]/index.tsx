"use client";

import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { MonthlySalesPaginationType } from "types/influencerType";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { formatPrice } from "utils/formatPrice";
import { InfluencerSalesContainer } from "./style";
import LoadingPage from "app/loading";

interface InfluencerDetailsProps {
  influencerId: string;
}

const InfluencerSales = ({ influencerId }: InfluencerDetailsProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [salesData, setSalesData] = useState<MonthlySalesPaginationType>();
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    connectionAPIGet<MonthlySalesPaginationType>(
      `influencer/${influencerId}/sales-history?page=${page}&limit=${itemsPerPage}`,
      apiUrl,
    )
      .then((res) => {
        setSalesData(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [influencerId, page]);

  const getMonthName = (month: number) => {
    const months = [
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
    return months[month - 1];
  };

  const getCurrentMonthSales = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna 0-11
    const currentYear = currentDate.getFullYear();

    return salesData?.data.find(
      (sale) => sale.month === currentMonth && sale.year === currentYear,
    );
  };

  // if (loading) {
  //   return (
  //     <InfluencerSalesContainer>
  //       <div className="desktop">
  //         <HeaderEnviroment>
  //           <DefaultHeader backWard title="HISTÓRICO DE VENDAS" />
  //         </HeaderEnviroment>
  //       </div>
  //       <div className="mobile mobileHeader">
  //         <Text nowrap align="center" fontName="LARGE_SEMI_BOLD">
  //           HISTÓRICO VENDAS
  //         </Text>
  //       </div>
  //       <div className="loadingContainer">
  //         <Text
  //           align="center"
  //           fontName="REGULAR_MEDIUM"
  //           color={theme.text_01}
  //         >
  //           Carregando histórico de vendas...
  //         </Text>
  //       </div>
  //     </InfluencerSalesContainer>
  //   );
  // }

  if (loading || !salesData) {
    return <LoadingPage />;
  }

  return (
    <InfluencerSalesContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="HISTÓRICO DE VENDAS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text nowrap align="center" fontName="LARGE_SEMI_BOLD">
          HISTÓRICO VENDAS
        </Text>
      </div>

      <div className="salesMainContent">
        <div className="headerSection">
          <Text fontName="LARGE_SEMI_BOLD" color={theme.text_01}>
            {salesData?.influencerName}
          </Text>
          <Text fontName="REGULAR_MEDIUM" color={theme.text_03}>
            Histórico de Vendas
          </Text>
          <Text fontName="REGULAR_MEDIUM" color={theme.approved}>
            Total de {salesData?.totalSales} períodos registrados
          </Text>
        </div>

        <div className="infoSection salesInfo">
          {page === 1 && (
            <Text fontName="REGULAR_MEDIUM" color={theme.mainColor}>
              Mês Atual
            </Text>
          )}
          <div className="salesContent">
            {page === 1 && (
              <div className="currentMonthSales">
                <Text fontName="REGULAR_MEDIUM" color={theme.text_01}>
                  Mês Atual
                </Text>
                {getCurrentMonthSales() ? (
                  <div className="salesAmount">
                    <Text fontName="LARGE_SEMI_BOLD" color={theme.approved}>
                      R${" "}
                      {formatPrice(Number(getCurrentMonthSales()!.totalSales))}
                    </Text>
                    <Text fontName="SMALL_MEDIUM" color={theme.text_03}>
                      {getMonthName(getCurrentMonthSales()!.month)}{" "}
                      {getCurrentMonthSales()!.year}
                    </Text>
                  </div>
                ) : (
                  <div className="noSales">
                    <Text fontName="REGULAR_MEDIUM" color={theme.text_03}>
                      Nenhuma venda registrada este mês
                    </Text>
                  </div>
                )}
              </div>
            )}

            <Text fontName="REGULAR_MEDIUM" color={theme.mainColor}>
              Histórico de Vendas
            </Text>

            <div className="previousMonthsSales">
              {salesData?.data.length > 0 ? (
                <div className="salesList">
                  {salesData?.data.map((sale) => (
                    <div key={sale.id} className="salesItem">
                      <div className="salesInfo">
                        <Text fontName="SMALL_MEDIUM" color={theme.text_01}>
                          {getMonthName(sale.month)} {sale.year}
                        </Text>
                        <Text fontName="REGULAR_MEDIUM" color={theme.approved}>
                          R$ {formatPrice(Number(sale.totalSales))}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noSales">
                  <Text fontName="REGULAR_MEDIUM" color={theme.text_03}>
                    Nenhuma venda registrada para este parceiro
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={salesData?.totalPages || 1}
      />
    </InfluencerSalesContainer>
  );
};

export default InfluencerSales;
