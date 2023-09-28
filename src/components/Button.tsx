import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const colorClassName =
    props.variant === "secondary" ? styles.secondary : styles.primary;

  return (
    <button
      aria-label={props.ariaLabel ?? "Botão"}
      className={`${styles.button} ${colorClassName} ${props.className || ""}`}
      style={{ width: props.fullWidth ? "100%" : undefined }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
