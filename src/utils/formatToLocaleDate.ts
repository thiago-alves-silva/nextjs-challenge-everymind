const formatToLocaleDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = date.replace("Z", "-03:00");
  }

  return new Date(date).toLocaleDateString();
};

export default formatToLocaleDate;
