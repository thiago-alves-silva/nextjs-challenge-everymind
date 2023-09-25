import { StepFormProps } from "@/types/IStepFormProps";
import { useCandidateForm } from "@/context/CandidateFormContext";
import Input from "@/components/Input";
import FormControls from "../FormControls";
import MailIcon from "../../../../../../../public/mail.svg";
import validateEmail from "@/utils/validateEmail";

const StepOne = (props: StepFormProps) => {
  const { formData } = useCandidateForm();

  const validate = (): boolean => {
    return validateEmail(formData.email);
  };

  return (
    <>
      <Input
        name="email"
        placeholder="Seu e-mail"
        value={formData.email}
        onChange={props.handleOnChange}
      >
        <MailIcon />
      </Input>
      <FormControls validate={validate} />
    </>
  );
};

export default StepOne;
