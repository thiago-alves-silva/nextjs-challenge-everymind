import { Metadata } from "next";
import { notFound } from "next/navigation";
import { User } from "@/types/User";
import AccountModal from "@/components/AccountModal";
import LoginForm from "./_components/LoginForm";

interface LoginPageProps {
  params: { user: User };
}

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = ({ params: { user } }: LoginPageProps) => {
  if (user !== "candidate" && user !== "company") {
    notFound();
  }

  return (
    <AccountModal>
      <LoginForm user={user} />
    </AccountModal>
  );
};

export default LoginPage;
