export const formatDate = (utcDateString: string) => {
  const utcDate = new Date(utcDateString);

  if (isNaN(utcDate.getTime())) {
    return "Date no available";
  }
  utcDate.setHours(utcDate.getHours() - 3);

  const day = utcDate.getDate();
  const month = utcDate.getMonth() + 1;
  const year = utcDate.getFullYear();

  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const capitalizeFirstLetter = (inputString: string) => {
  const formattedString = inputString
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return formattedString.trim();
};
