import { CSSProperties } from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  width?: number;
  height?: number;
}

const defaultProperties: LoadingProps = {
  width: 20,
  height: 20,
};

const Loading = (props: LoadingProps = defaultProperties) => {
  const cssStyles: CSSProperties = {
    width: props.width,
    height: props.height,
  };

  return <span className={styles["loader"]} style={cssStyles}></span>;
};

export default Loading;
