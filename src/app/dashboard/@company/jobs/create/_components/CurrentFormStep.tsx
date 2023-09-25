import { useJobForm } from "@/context/JobFormContext";
import { JobApi } from "@/types/IJob";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const CurrentFormStep = () => {
  const { step, setFormData } = useJobForm();

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    setFormData((formData) => {
      const name = target.name as keyof JobApi;

      if (target instanceof HTMLInputElement && target.type === "checkbox") {
        if (name === "salary") {
          return { ...formData, [name]: target.checked ? null : "0" };
        }

        return { ...formData, [name]: target.checked };
      }

      return { ...formData, [name]: target.value };
    });
  };

  switch (step) {
    case 0:
      return <StepOne handleOnChange={handleOnChange} />;
    case 1:
      return <StepTwo />;

    default:
      return null;
  }
};

export default CurrentFormStep;
