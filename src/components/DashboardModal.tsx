import styles from "./DashboardModal.module.css";

interface DashboardModalProps {
  children?: React.ReactNode;
  className?: string;
}

const DashboardModal = (props: DashboardModalProps) => {
  return (
    <div className={`${styles.container} ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

export default DashboardModal;
