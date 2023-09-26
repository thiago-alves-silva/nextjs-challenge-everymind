"use client";
import {
  CANDIDATE_PROFILE_IMAGE_POST,
  COMPANY_PROFILE_IMAGE_POST,
} from "@/api";
import { useRouter } from "next/navigation";
import displayNotification from "@/utils/displayNotification";
import getBase64FromFile from "@/utils/getBase64FromFile";
import getUserFromTokenOnClientSide from "@/utils/getUserFromTokenOnClientSide";
import styles from "./ChangeProfileImage.module.css";

const ChangeProfileImage = () => {
  const router = useRouter();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    const [file] = target.files ?? [];

    if (file.type.startsWith("image/")) {
      const [extension] = file.name.match(/(?<=\.)\w+$/) ?? [];
      const payload = {
        data: await getBase64FromFile(file),
        extension,
      };
      const user = getUserFromTokenOnClientSide();

      if (user) {
        const requestOptions = {
          candidate: CANDIDATE_PROFILE_IMAGE_POST,
          company: COMPANY_PROFILE_IMAGE_POST,
        };
        const { url, options } = requestOptions[user.type](user.id, payload);
        const response = await fetch(url, options);

        if (response.ok) {
          displayNotification({
            text: "Foto de perfil alterada com sucesso",
            type: "success",
          });
          router.refresh();
        } else {
          displayNotification({
            text: "Erro ao atualizar a foto de perfil",
            type: "error",
          });
        }
      } else {
        displayNotification({
          text: "Token de usuário não identificado",
          type: "error",
        });
      }
    } else {
      displayNotification({
        text: "Formato de arquivo inválido",
        type: "error",
      });
    }

    target.value = "";
  };

  return (
    <label className={styles.container}>
      <span className={styles.label}>Selecionar imagem</span>
      <input type="file" accept="image/*" onChange={onChange} />
    </label>
  );
};

export default ChangeProfileImage;
