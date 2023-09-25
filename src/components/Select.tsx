"use client";
import ArrowDownIcon from "../../public/arrow_filled_down.svg";
import styles from "./Select.module.css";
import { useState } from "react";

interface SelectProps {
  children?: React.ReactNode;
  label?: string;
  className?: string;
  name?: string;
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  theme?: "light" | "dark";
}

const Select: React.FC<SelectProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedClass = isFocused ? styles.focused : "";
  const disabledClass = props.disabled ? styles.disabled : "";
  const themeClass = props.theme === "light" ? styles.light : styles.dark;

  return (
    <div className={`${disabledClass} ${themeClass}`}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <div
        className={`${styles.container} ${focusedClass} ${
          props.className || ""
        }`}
      >
        <select
          className={styles.input}
          name={props.name}
          value={props.value || ""}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={props.disabled}
        >
          {props.children}
        </select>
        <ArrowDownIcon className={styles["arrow-icon"]} />
      </div>
    </div>
  );
};

export default Select;
