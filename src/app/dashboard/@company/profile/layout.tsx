import DashboardModal from "@/components/DashboardModal";
import ProfileSidebar from "./_components/ProfileSidebar";
import styles from "./layout.module.css";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardModal>
      <div className={styles.grid}>
        <ProfileSidebar />
        {children}
      </div>
    </DashboardModal>
  );
};

export default ProfileLayout;
