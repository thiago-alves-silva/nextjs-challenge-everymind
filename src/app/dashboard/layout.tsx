import { notFound, redirect } from "next/navigation";
import CandidateHeader from "./@candidate/_components/CandidateHeader";
import CompanyHeader from "./@company/_components/CompanyHeader";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import styles from "./layout.module.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
  candidate: React.ReactNode;
  company: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const user = getUserFromTokenOnServerSide();

  if (!user) {
    redirect("/");
  }

  switch (user.type) {
    case "candidate":
      return (
        <>
          <CandidateHeader />
          <main className={styles.main}>
            <div className={styles.wrapper}>{props.candidate}</div>
          </main>
        </>
      );
    case "company":
      return (
        <>
          <CompanyHeader />
          <main className={styles.main}>
            <div className={styles.wrapper}>{props.company}</div>
          </main>
        </>
      );
    default:
      console.error(`Usuário '${user}' não mapeado!`);
      notFound();
  }
}
