import { useState } from "react";
import Calendar from "react-calendar";
import { Container } from "./style";
import "react-calendar/dist/Calendar.css";

export const CalendarChanged = ({ onChangeDate }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    onChangeDate(date);
  };

  return (
    <Container>
      <Calendar onChange={onChange} value={date} />
    </Container>
  );
};
