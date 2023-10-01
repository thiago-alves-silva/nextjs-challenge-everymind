interface setCookieProps {
  name: string;
  value: string;
  maxAge?: number;
  path?: string;
}

const setCookie = (props: setCookieProps) => {
  const cookieParts = [
    `${props.name}=${props.value}`,
    `Max-Age=${props.maxAge}`,
    `Path=${props.path}`,
  ];

  document.cookie = cookieParts.join(";");
};

export default setCookie;
