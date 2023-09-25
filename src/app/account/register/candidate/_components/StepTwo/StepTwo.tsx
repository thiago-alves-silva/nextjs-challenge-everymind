import Input from "@/components/Input";
import UserIcon from "../../../../../../../public/user.svg";
import NumberIcon from "../../../../../../../public/number.svg";
import PhoneIcon from "../../../../../../../public/phone.svg";
import CalendarIcon from "../../../../../../../public/calendar.svg";
import FormControls from "../FormControls";
import maskCpf from "@/utils/maskCpf";
import maskPhone from "@/utils/maskPhone";
import maskDate from "@/utils/maskDate";
import validateCpf from "@/utils/validateCpf";
import validatePhone from "@/utils/validatePhone";
import { StepFormProps } from "@/types/IStepFormProps";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { cpfRegex, dateRegex } from "@/regex";

const StepTwo = (props: StepFormProps) => {
  const { formData } = useCandidateForm();

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      return false;
    }

    if (!cpfRegex.test(formData.cpf) || !validateCpf(formData.cpf)) {
      return false;
    }

    if (!validatePhone(formData.phone)) {
      return false;
    }

    if (!dateRegex.test(formData.birthdate)) {
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
        name="birthDate"
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

export default StepTwo;
