import "./CalendarLabel.scss";

interface LabelProps {
  children: string | number;
}

const CalendarLabel = ({ children }: LabelProps) => {
  return <div className="calendar-label">{children}</div>;
};

export default CalendarLabel;
