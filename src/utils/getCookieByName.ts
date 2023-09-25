const getCookieByName = (cookies: string, key: string) => {
  const splitCookies = cookies.split(";");
  const cookieEntries = splitCookies.map((cookie) => cookie.split("="));
  const [, value] = cookieEntries.find(([_key]) => _key === key) || [null];

  return value ?? null;
};

export default getCookieByName;
