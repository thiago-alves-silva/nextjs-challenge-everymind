"use client";
import SearchIcon from "../../public/search.svg";
import styles from "./SearchBar.module.css";
import { useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = (props: SearchBarProps) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeClassName = active ? styles.active : "";

  const handleClick = () => {
    setActive(() => {
      inputRef.current?.focus();
      return true;
    });
  };

  const handleBlur = () => {
    if (!props.value) {
      setActive(false);
    }
  };

  return (
    <div
      className={`${styles.container} ${activeClassName}`}
      onBlur={handleBlur}
    >
      <button className={styles.button} onClick={handleClick}>
        <SearchIcon />
      </button>

      <input
        type="text"
        placeholder="Pesquisar"
        className={styles.input}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setActive(true)}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
