import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarContainer, Wrapper } from "./style";

interface DateFilterProps {
  startDate?: Date;
  endDate?: Date;
  onDateChange: (range: { from?: Date; to?: Date }) => void;
}

const CalendarComponent = ({
  startDate,
  endDate,
  onDateChange,
}: DateFilterProps) => {
  const [from, setFrom] = useState<Date | undefined>(startDate);
  const [to, setTo] = useState<Date | undefined>(endDate);

  const formatLabel = () => {
    if (from && to) {
      return `${format(from, "dd/MM/yyyy")} - ${format(to, "dd/MM/yyyy")}`;
    }
    if (from) {
      return format(from, "dd/MM/yyyy");
    }
    return "Selecionar período";
  };

  return (
    <Wrapper>
      <CalendarContainer>
        <DayPicker
          locale={ptBR}
          mode="range"
          selected={{ from, to }}
          onSelect={({ from, to }) => {
            setFrom(from || undefined);
            setTo(to || undefined);
            onDateChange({ from, to });
          }}
        />
      </CalendarContainer>
    </Wrapper>
  );
};

export default CalendarComponent;
