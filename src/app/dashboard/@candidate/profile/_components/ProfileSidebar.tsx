import ActiveLink from "@/components/ActiveLink";
import logout from "@/utils/logout";
import styles from "./ProfileSidebar.module.css";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";

const ProfileSidebar = () => {
  const user = getUserFromTokenOnServerSide();

  return (
    <div className={styles.container}>
      <div className={styles["profile-image"]}></div>
      <span className={styles["profile-name"]}>{user?.name}</span>
      <nav className={styles.nav}>
        <ul className={styles["link-list"]}>
          <li>
            <ActiveLink
              href="/dashboard/profile/register"
              className={styles.link}
            >
              Dados cadastrais
            </ActiveLink>
            <ActiveLink
              href="/dashboard/profile/social"
              className={styles.link}
            >
              Dados sociais
            </ActiveLink>
          </li>
        </ul>
      </nav>
      <form>
        <button className={styles["logout-button"]} formAction={logout}>
          Sair da conta
        </button>
      </form>
    </div>
  );
};

export default ProfileSidebar;
