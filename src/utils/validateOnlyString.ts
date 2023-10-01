const validateOnlyString = (name: string): boolean => {
  if (!name.trim()) {
    return false;
  }

  return !/\d/.test(name);
};

export default validateOnlyString;
