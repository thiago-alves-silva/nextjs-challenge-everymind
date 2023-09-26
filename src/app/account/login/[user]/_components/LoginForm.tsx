"use client";
import { LOGIN_USER_POST } from "@/api";
import { isUserLogin } from "@/types/IUserLogin";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import MailIcon from "../../../../../../public/mail.svg";
import PasswordIcon from "../../../../../../public/password.svg";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import validateEmail from "@/utils/validateEmail";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import Loading from "@/components/Loading";

interface LoginFormProps {
  user: User;
}

const LoginForm = ({ user }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const credentials = Object.fromEntries(data.entries());
    const payload = Object.assign(credentials, { user });

    if (!isUserLogin(payload)) {
      // erro desconhecido
      console.log("erro desconhecido");
      return;
    }
    setLoading(true);

    if (validateEmail(payload.email)) {
      const { url, options } = LOGIN_USER_POST(payload);
      const response = await fetch(url, options);

      if (response.ok) {
        const { token } = await response.json();

        document.cookie = `token=${token};Max-Age=3600;Path=/`;
        console.log("Usuário logado com sucesso");
        router.push("/dashboard");
      } else {
        console.log(`[${response.status}] Falha no login:`);
        console.log(await response.text());
      }
    } else {
      console.log("Email invalido");
    }

    setLoading(false);
  };

  return (
    <>
      <form action={handleSubmit} className={styles.form}>
        <Input name="email" placeholder="E-mail" className={styles.input}>
          <MailIcon />
        </Input>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          className={styles.input}
        >
          <PasswordIcon />
        </Input>
        <Button fullWidth={true} disabled={loading}>
          {loading ? <Loading /> : "Entrar"}
        </Button>
      </form>
      <div className={styles["buttons-container"]}>
        <Link href={"/"} className={styles["back"]}>
          <BackButton />
        </Link>
        <Link
          href={`/account/register/${user}`}
          className={styles["not-registered"]}
        >
          Não sou cadastrado
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
