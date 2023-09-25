import styles from "./AccountModal.module.css";

interface AccountModalProps {
  children?: React.ReactNode;
  className?: string;
}

const AccountModal = (props: AccountModalProps) => {
  return (
    <div className={`${styles.container} ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

export default AccountModal;
