import { CSSProperties } from "react";
import ChangeProfileImage from "./ChangeProfileImage";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  className?: string;
}

const ProfileImage = (props: ProfileImageProps) => {
  const cssStyles: CSSProperties = {
    position: "relative",
    backgroundColor: "var(--c7)",
    border: "3px solid var(--c5)",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "0.5rem",
    width: "9rem",
    height: "9rem",
  };

  return (
    <div
      className={`${styles["profile-image"]} ${props.className ?? ""}`}
      style={cssStyles}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={props.src}
        alt="Foto de perfil"
        className={styles.image}
        style={{ objectFit: "cover" }}
        width={144}
        height={144}
      />
      <ChangeProfileImage />
    </div>
  );
};

export default ProfileImage;
