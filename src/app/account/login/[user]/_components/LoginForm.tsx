"use client";
import { LOGIN_USER_POST } from "@/api";
import { isUserLogin } from "@/types/IUserLogin";
import { UserType } from "@/types/UserType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MailIcon from "../../../../../../public/mail.svg";
import PasswordIcon from "../../../../../../public/password.svg";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import Loading from "@/components/Loading";
import displayNotification from "@/utils/displayNotification";
import validateEmail from "@/utils/validateEmail";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  user: UserType;
}

const LoginForm = ({ user }: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const credentials = Object.fromEntries(data.entries());
    const payload = Object.assign(credentials, { user });

    if (!isUserLogin(payload)) {
      return displayNotification({
        text: "Erro desconhecido",
        type: "error",
      });
    }

    if (!payload.email.trim() || !payload.password.trim()) {
      return displayNotification({
        text: "Preencha todos os campos",
        type: "error",
      });
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
        if (response.status === 400) {
          displayNotification({
            text: "E-mail ou senha incorretos!",
            type: "error",
          });
        } else {
          displayNotification({ text: "Falha no login", type: "error" });
        }
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
