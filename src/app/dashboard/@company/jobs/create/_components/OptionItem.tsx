import { FormStep, Step } from "@/types/IJob";
import { useJobForm } from "@/context/JobFormContext";
import DeleteButton from "./DeleteButton";
import Input from "@/components/Input";

interface OptionItemProps {
  option: {
    label: string;
    value: string;
  };
  stepIndex: number;
  questionIndex: number;
  optionIndex: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const OptionItem = (props: OptionItemProps) => {
  const { setFormData } = useJobForm();

  const deleteOptionFromQuestion = (
    questionIndex: number,
    optionIndex: number
  ) => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const question = steps[props.stepIndex].questions[
        questionIndex
      ] as FormStep;

      if (Array.isArray(question.options)) {
        question.options.splice(optionIndex, 1);
      }

      return { ...formData, steps };
    });
  };

  return (
    <li>
      <Input
        label={`Opção ${props.optionIndex + 1}`}
        name={`option-${props.questionIndex}.${props.optionIndex}`}
        value={props.option.label}
        onChange={props.onChange}
        theme="light"
      />
      <DeleteButton
        onClick={() =>
          deleteOptionFromQuestion(props.questionIndex, props.optionIndex)
        }
      >
        Remover opção
      </DeleteButton>
    </li>
  );
};

export default OptionItem;
