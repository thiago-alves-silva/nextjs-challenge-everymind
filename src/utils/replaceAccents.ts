const accents = ["aáàãäâ", "eéèëê", "iíìïî", "oóòõöô", "uúùüû", "cç"];

const replaceAccents = (text: string) => {
  accents.forEach((chars) => {
    text = text.replace(new RegExp(`[${chars}]`, "gi"), chars[0]);
  });

  return text;
};

export default replaceAccents;
