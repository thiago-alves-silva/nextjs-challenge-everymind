"use client";
import { useState } from "react";
import CloseIcon from "../../public/close.svg";
import MenuIcon from "../../public/menu.svg";
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
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  return (
    <header className={styles.header}>
      <button
        className={styles["menu-button"]}
        onClick={() => setDisplayMobileMenu(true)}
      >
        <MenuIcon />
      </button>
      {displayMobileMenu && (
        <div
          className={styles.background}
          onClick={() => setDisplayMobileMenu(false)}
        ></div>
      )}
      <nav
        className={`${styles.nav} ${
          displayMobileMenu ? styles["display-mobile-menu"] : ""
        }`}
      >
        <button
          className={styles["close-button"]}
          onClick={() => setDisplayMobileMenu(false)}
        >
          <CloseIcon />
        </button>
        <ul className={styles.links}>
          {props.links.map((link) => (
            <li key={link.href}>
              <ActiveLink
                href={link.href}
                className={styles.link}
                onClick={() => setDisplayMobileMenu(false)}
              >
                {link.label}
              </ActiveLink>
            </li>
          ))}
        </ul>
        <Link
          href={"/dashboard/profile"}
          onClick={() => setDisplayMobileMenu(false)}
        >
          <Button className={styles["profile-button"]}>Meu perfil</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
