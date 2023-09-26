import { cpfRegex, dateRegex } from "@/regex";
import { StepFormProps } from "@/types/IStepFormProps";
import { useCandidateForm } from "@/context/CandidateFormContext";
import Input from "@/components/Input";
import UserIcon from "../../../../../../../public/user.svg";
import NumberIcon from "../../../../../../../public/number.svg";
import MailIcon from "../../../../../../../public/mail.svg";
import PhoneIcon from "../../../../../../../public/phone.svg";
import CalendarIcon from "../../../../../../../public/calendar.svg";
import FormControls from "../FormControls";
import maskCpf from "@/utils/maskCpf";
import maskPhone from "@/utils/maskPhone";
import maskDate from "@/utils/maskDate";
import validateCpf from "@/utils/validateCpf";
import validatePhone from "@/utils/validatePhone";
import validateEmail from "@/utils/validateEmail";
import displayNotification from "@/utils/displayNotification";

const StepOne = (props: StepFormProps) => {
  const { formData } = useCandidateForm();

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      displayNotification({
        text: "Preencha o nome",
        type: "error",
      });
      return false;
    }

    if (!cpfRegex.test(formData.cpf) || !validateCpf(formData.cpf)) {
      displayNotification({
        text: !formData.cpf.trim() ? "Preencha o CPF" : "Insira um CPF válido",
        type: "error",
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      displayNotification({
        text: !formData.email.trim()
          ? "Preencha do e-mail"
          : "Insira um e-mail válido",
        type: "error",
      });
      return false;
    }

    if (!validatePhone(formData.phone)) {
      displayNotification({
        text: !formData.phone.trim()
          ? "Preencha o telefone"
          : "Insira um telefone válido",
        type: "error",
      });
      return false;
    }

    if (!dateRegex.test(formData.birthdate)) {
      displayNotification({
        text: !formData.birthdate.trim()
          ? "Preencha a data de nascimento"
          : "Insira uma data de nascimento válida",
        type: "error",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Input
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={props.handleOnChange}
      >
        <UserIcon />
      </Input>
      <Input
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={(event) => {
          const value = maskCpf(event.target.value);
          event.target.value = value;
          props.handleOnChange(event);
        }}
      >
        <NumberIcon />
      </Input>
      <Input
        name="email"
        placeholder="Seu e-mail"
        value={formData.email}
        onChange={props.handleOnChange}
      >
        <MailIcon />
      </Input>
      <Input
        name="phone"
        placeholder="Telefone"
        value={formData.phone}
        onChange={(event) => {
          const value = maskPhone(event.target.value);
          event.target.value = value;
          props.handleOnChange(event);
        }}
      >
        <PhoneIcon />
      </Input>
      <Input
        name="birthdate"
        placeholder="Data de nascimento"
        value={formData.birthdate}
        onChange={(event) => {
          const value = maskDate(event.target.value);
          event.target.value = value;
          props.handleOnChange(event);
        }}
      >
        <CalendarIcon />
      </Input>
      <FormControls validate={validate} />
    </>
  );
};

export default StepOne;
