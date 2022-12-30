import "./CalendarSection.scss";
import Calendar from "react-calendar";
import React, { useState } from "react";
import { CalendarTileProperties } from "react-calendar";

interface SectionCalendarProps {
  showForm(): void;
}

const SectionCalendar = ({ showForm }: SectionCalendarProps) => {
  const [value, onChange] = useState<Date>(new Date());

  const setTileContent = (
    tileProps: CalendarTileProperties
  ): JSX.Element | null => {
    if (tileProps.view === "month") {
      if (tileProps.date.getDay() === 0) {
        return <p>It's Sunday!</p>;
      }
      return null;
    }
    return null;
  };

  const onClickDay = (
    date: Date,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      event.currentTarget.classList.contains("react-calendar__tile--active") ||
      event.currentTarget.parentElement?.classList.contains(
        "react-calendar__tile--active"
      )
    ) {
      console.log("Select day: ", value);
      showForm();
    }
  };

  return (
    <section className="calendar-section">
      <Calendar
        onChange={onChange}
        value={value}
        className="calendar"
        minDetail="year"
        next2Label={null}
        prev2Label={null}
        view="month"
        tileContent={(tileProps) => setTileContent(tileProps)}
        onClickDay={(value, event) => onClickDay(value, event)}
      />
    </section>
  );
};

export default SectionCalendar;
