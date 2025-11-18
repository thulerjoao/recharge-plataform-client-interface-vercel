import { FirstAvailablePeriodType, PeriodType } from "types/dashboardTypes";
import { PeriodSelectorContainer } from "./style";

interface PeriodSelectorProps {
  period: PeriodType;
  firstAvailablePeriod: FirstAvailablePeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

const PeriodSelector = ({
  period,
  firstAvailablePeriod,
  onPeriodChange,
}: PeriodSelectorProps) => {
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

  // Generate list of years from firstAvailablePeriod to current year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const startYear = firstAvailablePeriod.year;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  // Generate list of available months based on selected year
  const getAvailableMonths = (year: number) => {
    if (year === startYear && year === currentYear) {
      // If it's the same year (first and current), show only months between firstAvailablePeriod.month and currentMonth
      return Array.from(
        { length: currentMonth - firstAvailablePeriod.month + 1 },
        (_, i) => firstAvailablePeriod.month + i,
      );
    } else if (year === startYear) {
      // If it's the first year, show months starting from firstAvailablePeriod.month
      return Array.from(
        { length: 12 - firstAvailablePeriod.month + 1 },
        (_, i) => firstAvailablePeriod.month + i,
      );
    } else if (year === currentYear) {
      // If it's the current year, show months up to currentMonth
      return Array.from({ length: currentMonth }, (_, i) => i + 1);
    } else {
      // Intermediate years, show all months
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
  };

  const availableMonths = getAvailableMonths(period.year);

  const handleMonthChange = (month: number) => {
    const daysInMonth = new Date(period.year, month, 0).getDate();
    const startDate = `${period.year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${period.year}-${String(month).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;

    onPeriodChange({
      ...period,
      month,
      startDate,
      endDate,
      type: `${period.year}-${String(month).padStart(2, "0")}`,
    });
  };

  const handleYearChange = (year: number) => {
    // When changing year, adjust month if necessary
    const newAvailableMonths = getAvailableMonths(year);
    let newMonth = period.month;

    // If current month is not available in the new year, use the first available
    if (!newAvailableMonths.includes(period.month)) {
      newMonth = newAvailableMonths[0];
    }

    const daysInMonth = new Date(year, newMonth, 0).getDate();
    const startDate = `${year}-${String(newMonth).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(newMonth).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;

    onPeriodChange({
      ...period,
      year,
      month: newMonth,
      startDate,
      endDate,
      type: `${year}-${String(newMonth).padStart(2, "0")}`,
    });
  };

  return (
    <PeriodSelectorContainer>
      <select
        value={period.month}
        onChange={(e) => handleMonthChange(Number(e.target.value))}
        className="periodSelect"
      >
        {availableMonths.map((monthIndex) => (
          <option key={monthIndex} value={monthIndex}>
            {monthNames[monthIndex - 1]}
          </option>
        ))}
      </select>
      <select
        value={period.year}
        onChange={(e) => handleYearChange(Number(e.target.value))}
        className="periodSelect"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </PeriodSelectorContainer>
  );
};

export default PeriodSelector;
