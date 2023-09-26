"use client";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { CandidateApi } from "@/types/ICandidate";

const CurrentFormStep = () => {
  const { setFormData, step } = useCandidateForm();

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target }) => {
    setFormData((formData) => {
      const name = target.name as keyof CandidateApi;

      if (target instanceof HTMLInputElement && target.type === "checkbox") {
        return { ...formData, [name]: target.checked };
      }

      return { ...formData, [name]: target.value };
    });
  };

  switch (step) {
    case 0:
      return <StepOne handleOnChange={handleOnChange} />;
    case 1:
      return <StepTwo handleOnChange={handleOnChange} />;
    case 2:
      return <StepThree handleOnChange={handleOnChange} />;
    default:
      return null;
  }
};

export default CurrentFormStep;
