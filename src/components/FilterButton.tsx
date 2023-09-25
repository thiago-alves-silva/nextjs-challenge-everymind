"use client";
import styles from "./FilterButton.module.css";

interface FilterProps {
  count: number;
  onClick: React.MouseEventHandler;
}

const FilterButton = (props: FilterProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.counter}>
        <span>{props.count}</span>
      </div>
      <span className={styles.label}>Filtro</span>
    </div>
  );
};

export default FilterButton;
