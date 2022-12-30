const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const formattedDate = (date: Date) => {
  return {
    day: date.getDay(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
};
