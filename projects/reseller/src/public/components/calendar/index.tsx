import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import { StyledDatePickerWrapper } from "./style";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePickerWrapper>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
          />
        </StyledDatePickerWrapper>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CalendarComponent;
