const getAgeByBirthDate = (birthDate: Date) => {
  const now = Date.now();
  const difference = now - birthDate.getTime();
  const years = difference / 1000 / 60 / 60 / 24 / 30 / 12;

  return Math.floor(years);
};

export default getAgeByBirthDate;
