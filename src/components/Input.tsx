"use client";
import styles from "./Input.module.css";
import { useState } from "react";

interface InputProps {
  children?: React.ReactNode;
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  theme?: "light" | "dark";
  min?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedClass = isFocused ? styles.focused : "";
  const disabledClass = props.disabled ? styles.disabled : "";
  const themeClass = props.theme === "light" ? styles.light : styles.dark;

  return (
    <div className={`${disabledClass} ${themeClass} ${props.className || ""}`}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <div className={`${styles.container} ${focusedClass} `}>
        {props.children}
        <input
          type={props.type || "text"}
          className={styles.input}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={props.min}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default Input;
