const getAgeByBirthDate = (birthdate: Date) => {
  const now = Date.now();
  const difference = now - birthdate.getTime();
  const years = difference / 1000 / 60 / 60 / 24 / 30 / 12;

  return Math.floor(years);
};

export default getAgeByBirthDate;
