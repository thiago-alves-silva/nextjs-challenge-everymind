"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActiveLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ActiveLink = (props: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.endsWith(props.href);
  const activeClassName = isActive ? "active" : "";

  return (
    <Link
      className={`${props.className || ""} ${activeClassName}`}
      href={props.href}
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};

export default ActiveLink;
