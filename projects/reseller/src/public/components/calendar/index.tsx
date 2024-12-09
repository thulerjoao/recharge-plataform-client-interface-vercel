import dayjs from "dayjs";
import { useState } from "react";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div
      style={{
        width: "100%",
        height: "280px",
        backgroundColor: "black",
        marginBottom: "16px",
      }}
    />
  );
};

export default CalendarComponent;
