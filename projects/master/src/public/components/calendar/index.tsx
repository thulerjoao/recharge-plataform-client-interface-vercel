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
        color: "white ",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      calendar selector
    </div>
  );
};

export default CalendarComponent;
