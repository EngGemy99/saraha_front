const convertTime = (date) => {
  const now = new Date(date);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;
  const timeString = `${hour}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${amOrPm}`;
  return timeString;
};

export { convertTime };
