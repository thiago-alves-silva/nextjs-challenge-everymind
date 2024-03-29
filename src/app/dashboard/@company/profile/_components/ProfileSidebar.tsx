import ActiveLink from "@/components/ActiveLink";
import ProfileImage from "@/app/dashboard/_components/ProfileImage";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import getCompany from "@/utils/getCompany";
import logout from "@/utils/logout";
import styles from "./ProfileSidebar.module.css";

const ProfileSidebar = async () => {
  const user = getUserFromTokenOnServerSide();
  const company = user ? await getCompany(user.id) : null;

  return (
    <div className={styles.container}>
      <ProfileImage
        src={`/api/company/image/${company?.profile_image}`}
        className={styles["profile-image"]}
      />
      <span className={styles["profile-name"]}>{user?.name}</span>
      <div className={styles["nav-container"]}>
        <nav className={styles.nav}>
          <ul className={styles["link-list"]}>
            <li>
              <ActiveLink
                href="/dashboard/profile/register"
                className={styles.link}
              >
                Dados cadastrais
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
    </div>
  );
};

export default ProfileSidebar;
