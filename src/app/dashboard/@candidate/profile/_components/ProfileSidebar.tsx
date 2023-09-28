import ActiveLink from "@/components/ActiveLink";
import ProfileImage from "@/app/dashboard/_components/ProfileImage";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import getCandidate from "@/utils/getCandidate";
import logout from "@/utils/logout";
import styles from "./ProfileSidebar.module.css";

const ProfileSidebar = async () => {
  const user = getUserFromTokenOnServerSide();
  const candidate = user ? await getCandidate(user.id) : null;

  return (
    <div className={styles.container}>
      <ProfileImage
        src={`/api/candidate/image/${candidate?.profile_image}`}
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
    </div>
  );
};

export default ProfileSidebar;
