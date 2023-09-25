"use client";
import styles from "./Checkbox.module.css";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  className?: string;
  name?: string;
  value?: string;
  checked?: boolean | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  theme?: "light" | "dark";
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedClass = isFocused ? styles.focused : "";
  const disabledClass = props.disabled ? styles.disabled : "";
  const themeClass = props.theme === "light" ? styles.light : styles.dark;

  return (
    <label
      className={`${styles.container} ${
        props.className || ""
      } ${disabledClass} ${themeClass}`}
    >
      <input
        type="checkbox"
        className={`${styles.input} ${focusedClass}`}
        name={props.name}
        checked={props.checked || false}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={props.disabled}
      />
      {props.label && <span className={styles.label}>{props.label}</span>}
    </label>
  );
};

export default Checkbox;
