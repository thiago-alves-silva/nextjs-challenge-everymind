import { useState } from "react";
import styles from "./SwitchButton.module.css";

interface SwitchButtonProps {
  onChange: (value: boolean) => void;
}

const SwitchButton = (props: SwitchButtonProps) => {
  const [isOn, setIsOn] = useState(false);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setIsOn(target.checked);
    props.onChange(target.checked);
  };

  return (
    <label
      id="switch-button"
      className={`${styles.container} ${isOn ? styles.on : ""}`}
    >
      <input type="checkbox" id="switch-button" onChange={handleChange} />
      <div className={styles["inner-circle"]}></div>
    </label>
  );
};

export default SwitchButton;
