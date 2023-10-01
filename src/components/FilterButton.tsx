"use client";
import styles from "./FilterButton.module.css";

interface FilterProps {
  count: number;
  disabled: boolean;
  onClick: React.MouseEventHandler;
}

const FilterButton = (props: FilterProps) => {
  return (
    <div
      className={`${styles.container} ${props.disabled ? styles.disabled : ""}`}
      onClick={props.disabled ? undefined : props.onClick}
    >
      <div className={styles.counter}>
        <span>{props.count}</span>
      </div>
      <span className={styles.label}>Filtro</span>
    </div>
  );
};

export default FilterButton;
