import Image from "next/image";
import ChangeProfileImage from "./ChangeProfileImage";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
}

const ProfileImage = (props: ProfileImageProps) => {
  return (
    <div className={styles["profile-image"]}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={props.src}
        alt="Foto de perfil"
        className={styles.image}
        width={144}
        height={144}
      />
      <ChangeProfileImage />
    </div>
  );
};

export default ProfileImage;
