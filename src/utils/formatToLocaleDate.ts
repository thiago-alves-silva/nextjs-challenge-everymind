const formatToLocaleDate = (date: Date | string) => {
  if (typeof date !== "string") {
    date = date.toJSON();
  }

  return new Date(date.replace("Z", "-03:00")).toLocaleDateString();
};

export default formatToLocaleDate;
