import "./CalendarSection.scss";
import Calendar from "react-calendar";
import React, { useState } from "react";
import { CalendarTileProperties } from "react-calendar";
import { DailyDetail } from "../../types";
import { getDailyDetails } from "../../services/storage";
import { formattedDate } from "../../utilities/dateFormating";
import CalendarLabel from "./Components/CalendarLabel/CalendarLabel";
import { dollarFormat } from "../../utilities/currencyFormat";

interface SectionCalendarProps {
  showForm(): void;
  setDateSelected(date: Date): void;
  dailyDetails: Array<DailyDetail>;
}

const SectionCalendar = ({
  showForm,
  setDateSelected,
  dailyDetails,
}: SectionCalendarProps) => {
  const [value, onChange] = useState<Date>(new Date());

  const setTileContent = (
    tileProps: CalendarTileProperties
  ): JSX.Element | null => {
    if (tileProps.view === "month") {
      const dailyDetail = dailyDetails.find(
        (detail) =>
          formattedDate(detail.date).full === formattedDate(tileProps.date).full
      );
      if (dailyDetail) {
        return (
          <CalendarLabel>
            {dollarFormat.format(dailyDetail.total)}
          </CalendarLabel>
        );
      }
      //}
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
      setDateSelected(value);
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
