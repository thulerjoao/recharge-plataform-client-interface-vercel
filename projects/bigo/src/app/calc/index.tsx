"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useMemo, useState } from "react";
import { CalculatorContainer } from "./style";

interface PaymentTier {
  meta: number;
  beans: number;
  bonus: number;
  total: number;
}

const PRICE_PER_1000_BEAN = 20.05; //104 BRR = 19.34 USD
const PRICE_PER_1000_BEAN_BRL = 104; //104 BRR = 19.34 USD

const PAYMENT_TIERS: PaymentTier[] = [
  { meta: 2000, beans: 9.52, bonus: 14.0, total: 23.52 },
  { meta: 5000, beans: 23.8, bonus: 35.0, total: 58.8 },
  { meta: 10000, beans: 47.62, bonus: 74.0, total: 121.62 },
  { meta: 20000, beans: 95.23, bonus: 141.0, total: 236.23 },
  { meta: 30000, beans: 142.86, bonus: 211.0, total: 353.86 },
  { meta: 60000, beans: 285.71, bonus: 422.0, total: 707.71 },
  { meta: 100000, beans: 476.19, bonus: 660.0, total: 1136.19 },
  { meta: 150000, beans: 714.29, bonus: 990.0, total: 1704.29 },
  { meta: 200000, beans: 952.38, bonus: 1320.0, total: 2272.38 },
  { meta: 250000, beans: 1190.48, bonus: 1650.0, total: 2840.48 },
  { meta: 300000, beans: 1428.57, bonus: 1980.0, total: 3408.57 },
  { meta: 400000, beans: 1904.76, bonus: 2700.0, total: 4604.76 },
  { meta: 500000, beans: 2380.95, bonus: 3550.0, total: 5930.95 },
  { meta: 750000, beans: 3571.43, bonus: 5500.0, total: 9071.43 },
  { meta: 1000000, beans: 4761.9, bonus: 6800.0, total: 11561.9 },
  { meta: 1500000, beans: 7142.86, bonus: 10400.0, total: 17542.86 },
  { meta: 2000000, beans: 9523.81, bonus: 14500.0, total: 24023.81 },
  { meta: 3000000, beans: 14285.71, bonus: 22500.0, total: 36785.71 },
];

const Calculator = () => {
  const [soldValue, setSoldValue] = useState<string>("");

  const formatNumberInput = (value: string) => {
    // Remove everything except digits and comma
    const cleaned = value.replace(/[^\d,]/g, "");
    // Separate integer and decimal parts
    const parts = cleaned.split(",");
    // Format the integer part with dots
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Return with or without decimal part
    return parts.length > 1 ? `${integerPart},${parts[1]}` : integerPart;
  };

  const formatCurrency = (value: number) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "$ 0,00";
    }
    return `$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calculation = useMemo(() => {
    const sold =
      parseFloat(soldValue.replace(/\./g, "").replace(",", ".")) || 0;

    if (sold <= 0) {
      return null;
    }

    // Find the current tier (the last tier that was reached)
    const currentTier = PAYMENT_TIERS.find((tier, index) => {
      const nextTier = PAYMENT_TIERS[index + 1];
      return sold >= tier.meta && (!nextTier || sold < nextTier.meta);
    });

    // Find the next tier
    const nextTierIndex = PAYMENT_TIERS.findIndex((tier) => sold < tier.meta);
    const nextTier = nextTierIndex !== -1 ? PAYMENT_TIERS[nextTierIndex] : null;

    if (!nextTier) {
      const currentBeansValue = sold / 210;
      const currentBonus = currentTier ? currentTier.bonus : 0;
      const currentNetGain = currentBeansValue + currentBonus;

      return {
        currentTier: PAYMENT_TIERS[PAYMENT_TIERS.length - 1],
        nextTier: null,
        beansNeeded: 0,
        costInDollars: 0,
        currentTotal: 0,
        nextTotal: 0,
        additionalGain: 0,
        currentNetGain,
        nextTotalReceived: 0,
        nextNetGain: 0,
        profit: 0,
        isWorthIt: false,
        message: "Você já atingiu a meta máxima!",
      };
    }

    // Calculate current gain (without doing anything): (sold coins / 210) + current tier bonus
    const currentBeansValue = sold / 210;
    const currentBonus = currentTier ? currentTier.bonus : 0;
    const currentNetGain = currentBeansValue + currentBonus; // What she earns without doing anything

    // Calculate total that would be received if completed: (next tier / 210) + next tier bonus
    const nextBeansValue = nextTier.meta / 210;
    const nextTotalReceived = nextBeansValue + nextTier.bonus;

    // Cost to complete: missing coins / 210
    const beansNeeded = nextTier.meta - sold;
    const costInDollars = (beansNeeded / 1000) * PRICE_PER_1000_BEAN;

    // Net gain if completed: total received - cost paid
    const nextNetGain = nextTotalReceived - costInDollars;

    // Compare: net gain if completed vs current gain
    // Worth it if net gain is greater than current gain
    const profit = nextNetGain - currentNetGain;
    const isWorthIt = profit > 0;

    return {
      currentTier: currentTier || null,
      nextTier,
      beansNeeded,
      costInDollars,
      currentNetGain,
      nextTotalReceived,
      nextNetGain,
      profit,
      isWorthIt,
      message: isWorthIt
        ? `Vale a pena! Você terá um lucro adicional de ${formatCurrency(profit)}`
        : `Não vale a pena. Você teria um prejuízo de ${formatCurrency(Math.abs(profit))}`,
    };
  }, [soldValue]);

  const formatNumber = (value: number) => {
    if (value === undefined || value === null || isNaN(value)) {
      return "0";
    }
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  return (
    <CalculatorContainer>
      <div className="header">
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          color={Theme.colors.mainlight}
          margin="0 0 8px 0"
        >
          Calculadora de Metas
        </Text>
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          color={Theme.colors.secondaryText}
          margin="0 0 40px 0"
        >
          Calcule se vale a pena investir do próprio bolso para atingir a
          próxima meta
        </Text>
      </div>

      <div className="calculatorCard">
        <div className="inputSection">
          <Text
            tag="p"
            fontName="REGULAR_MEDIUM"
            color={Theme.colors.mainlight}
            margin="0 0 12px 0"
          >
            Quantos beans você já recebeu?
          </Text>
          <Input
            type="text"
            placeholder="Ex: 15.000"
            value={soldValue}
            onChange={(e) => {
              const formatted = formatNumberInput(e.target.value);
              setSoldValue(formatted);
            }}
            margin="0"
            height={40}
          />
        </div>

        <div className="basePriceInfo">
          <Text
            tag="p"
            fontName="REGULAR"
            color={Theme.colors.secondaryText}
            align="center"
            margin="0"
          >
            Valor base: {formatCurrency(PRICE_PER_1000_BEAN)} (R${" "}
            {PRICE_PER_1000_BEAN_BRL.toFixed(2).replace(".", ",")}) por 1.000
            beans
          </Text>
        </div>

        {calculation && (
          <div className="resultsSection">
            <div className="currentTier">
              <Text
                tag="p"
                fontName="REGULAR"
                color={Theme.colors.secondaryText}
                margin="0 0 4px 0"
              >
                Situação Atual:
              </Text>
              <Text
                tag="p"
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainlight}
                margin="0"
              >
                Ganho atual: {formatCurrency(calculation.currentNetGain)}
                {calculation.currentTier && (
                  <>
                    {" "}
                    ({formatNumber(calculation.currentTier.meta)} beans +{" "}
                    {formatCurrency(calculation.currentTier.bonus)} bônus)
                  </>
                )}
              </Text>
            </div>

            {calculation.nextTier ? (
              <>
                <div className="nextTier">
                  <Text
                    tag="p"
                    fontName="REGULAR"
                    color={Theme.colors.secondaryText}
                    margin="0 0 4px 0"
                  >
                    Se Completar a Próxima Meta:
                  </Text>
                  <Text
                    tag="p"
                    fontName="REGULAR_MEDIUM"
                    color={Theme.colors.mainlight}
                    margin="0"
                  >
                    Total recebido:{" "}
                    {formatCurrency(calculation.nextTotalReceived)} (
                    {formatNumber(calculation.nextTier.meta)} beans +{" "}
                    {formatCurrency(calculation.nextTier.bonus)} bônus)
                  </Text>
                </div>

                <div className="calculationDetails">
                  <div className="detailRow">
                    <Text
                      tag="span"
                      fontName="REGULAR"
                      color={Theme.colors.secondaryText}
                    >
                      Beans necessários:
                    </Text>
                    <Text
                      tag="span"
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.mainlight}
                    >
                      {formatNumber(calculation.beansNeeded)}
                    </Text>
                  </div>

                  <div className="detailRow">
                    <Text
                      tag="span"
                      fontName="REGULAR"
                      color={Theme.colors.secondaryText}
                    >
                      Custo em dólar:
                    </Text>
                    <Text
                      tag="span"
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.pending}
                    >
                      {formatCurrency(calculation.costInDollars)}
                    </Text>
                  </div>

                  <div className="detailRow">
                    <Text
                      tag="span"
                      fontName="REGULAR"
                      color={Theme.colors.secondaryText}
                    >
                      Ganho total se completar:
                    </Text>
                    <Text
                      tag="span"
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.mainlight}
                    >
                      {formatCurrency(calculation.nextNetGain)}
                      <br />
                      (recebe {formatCurrency(calculation.nextTotalReceived)} -
                      desembolsa {formatCurrency(calculation.costInDollars)})
                    </Text>
                  </div>

                  <div className="detailRow highlight">
                    <Text
                      tag="span"
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.secondaryText}
                    >
                      Lucro/Prejuízo:
                    </Text>
                    <Text
                      tag="span"
                      fontName="REGULAR_MEDIUM"
                      color={
                        calculation.isWorthIt
                          ? Theme.colors.approved
                          : Theme.colors.refused
                      }
                    >
                      {formatCurrency(calculation.profit)}
                    </Text>
                  </div>
                </div>

                <div
                  className={`recommendation ${calculation.isWorthIt ? "worthIt" : "notWorthIt"}`}
                >
                  <Text
                    tag="p"
                    fontName="REGULAR_MEDIUM"
                    color={Theme.colors.mainlight}
                    align="center"
                    margin="0"
                  >
                    {calculation.message}
                  </Text>
                </div>

                <div className="alertBanner">
                  <span className="alertIcon">⚠️</span>
                  <Text
                    tag="p"
                    fontName="REGULAR"
                    color={Theme.colors.mainlight}
                    className="alertText"
                    margin="0"
                  >
                    Lembre-se de sempre enviar diamantes extras para não correr
                    risco de perder a meta em caso de descontos por parte do
                    aplicativo
                  </Text>
                </div>
              </>
            ) : (
              <div className="maxTier">
                <Text
                  tag="p"
                  fontName="REGULAR_MEDIUM"
                  color={Theme.colors.mainlight}
                  align="center"
                  margin="0"
                >
                  {calculation.message}
                </Text>
              </div>
            )}
          </div>
        )}

        {!calculation && soldValue && (
          <div className="errorMessage">
            <Text
              tag="p"
              fontName="REGULAR"
              color={Theme.colors.pending}
              align="center"
            >
              Por favor, insira um valor válido
            </Text>
          </div>
        )}
      </div>

      <div className="infoSection">
        <Text
          tag="h2"
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.mainlight}
          margin="0 0 16px 0"
        >
          Tabela de Pagamentos
        </Text>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Meta</th>
                <th>Beans</th>
                <th>Bônus</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_TIERS.map((tier, index) => (
                <tr key={index}>
                  <td>{formatNumber(tier.meta)}</td>
                  <td>{formatCurrency(tier.beans)}</td>
                  <td>{formatCurrency(tier.bonus)}</td>
                  <td>{formatCurrency(tier.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorContainer>
  );
};

export default Calculator;
