"use client";
import styles from "./Textarea.module.css";
import { useState } from "react";

interface TextareaProps {
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedClass = isFocused ? styles.focused : "";
  const disabledClass = props.disabled ? styles.disabled : "";

  return (
    <div className={`${disabledClass} ${props.className || ""}`}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <div className={`${styles.container} ${focusedClass} `}>
        <textarea
          className={styles.textarea}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default Textarea;
