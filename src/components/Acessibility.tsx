"use client";
import ContrastIcon from "../../public/contrast.svg";
import TextIncreaseIcon from "../../public/text-increase.svg";
import TextDecreaseIcon from "../../public/text-decrease.svg";
import styles from "./Acessibility.module.css";

const Acessibility = () => {
  const toggleHighContrast = () => {
    document.documentElement.classList.toggle("high-contrast");
  };

  const changeFontSize = (action: "increase" | "decrease") => {
    const { fontSize } = document.documentElement.style;
    const size = parseInt(fontSize) || 16;

    switch (action) {
      case "increase":
        document.documentElement.style.fontSize = `${size + 4}px`;
        break;
      case "decrease":
        document.documentElement.style.fontSize = `${size - 4}px`;
        break;
    }
  };

  return (
    <div className={styles.acessibility}>
      <div className={styles.contrast}>
        <button
          aria-label="Alterar contraste"
          title="Alterar contraste"
          onClick={toggleHighContrast}
        >
          <ContrastIcon />
        </button>
      </div>
      <div className={styles["font-size"]}>
        <button
          aria-label="Reduzir tamanho da fonte"
          title="Reduzir tamanho da fonte"
          onClick={() => changeFontSize("decrease")}
        >
          <TextDecreaseIcon />
        </button>
        <button
          aria-label="Aumentar tamanho da fonte"
          title="Aumentar tamanho da fonte"
          onClick={() => changeFontSize("increase")}
        >
          <TextIncreaseIcon />
        </button>
      </div>
    </div>
  );
};

export default Acessibility;
