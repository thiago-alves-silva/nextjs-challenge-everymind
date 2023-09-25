import ActiveLink from "./ActiveLink";
import Button from "./Button";
import Link from "next/link";
import styles from "./Header.module.css";

interface Link {
  href: string;
  label: string;
}

interface HeaderProps {
  links: Link[];
}

const Header = (props: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.links}>
          {props.links.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} className={styles.link}>
                {link.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link href={"/dashboard/profile"}>
        <Button className={styles["profile-button"]}>Meu perfil</Button>
      </Link>
    </header>
  );
};

export default Header;
