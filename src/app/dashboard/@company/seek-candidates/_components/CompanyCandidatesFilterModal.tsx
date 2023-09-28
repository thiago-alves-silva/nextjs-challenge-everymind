import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Checkbox from "@/components/Checkbox";
import styles from "./CompanyCandidatesFilterModal.module.css";
import { useCompanyCandidates } from "@/context/CompanyCandidatesContext";
import { CandidateFilter } from "@/types/ICandidateFilter";
import { RacialIdentity } from "@/types/RacialIdentity";
import RadioButton from "@/components/RadioButton";
import getCandidateList from "@/utils/getCandidateList";
import displayNotification from "@/utils/displayNotification";

interface CompanyCandidatesFilterModalProps {
  onClose: () => void;
}

const CompanyCandidatesFilterModal = (
  props: CompanyCandidatesFilterModalProps
) => {
  const { filter, setFilter, setCandidates } = useCompanyCandidates();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFilter((filter) => {
      const name = target.name as keyof CandidateFilter;

      if (target.type === "checkbox") {
        const value = (filter[name] ?? []) as string[];

        if (target.checked) {
          value.push(target.value);
        } else {
          value.splice(value.indexOf(target.value), 1);
        }

        if (name === "racial_identity" || name === "family_income") {
          filter[name] = value as any[];
        }
      } else if (target.type === "radio") {
        if (
          name === "is_lgbtqia" ||
          name === "has_disability" ||
          name === "indigenous_descendancy"
        ) {
          filter[name] = target.value === "on";
        }
      }

      return { ...filter };
    });
  };

  const filterJobs = () => {
    const hasFilter = Object.values(filter).some((v) => v !== null);

    if (hasFilter) {
      (async () => {
        const candidates = await getCandidateList(filter);

        displayNotification({
          text: "Filtro aplicado com sucesso!",
          type: "success",
        });
        setCandidates(candidates);
        props.onClose();
      })();
    }
  };

  const racialIdentities: { value: RacialIdentity; label: string }[] = [
    { value: "branco", label: "Branco" },
    { value: "pardo", label: "Pardo" },
    { value: "preto", label: "Preto" },
    { value: "amarelo", label: "Amarelo" },
  ];

  const familyIncome: { value: string; label: string }[] = [
    { value: "b", label: "Classe B" },
    { value: "c", label: "Classe C" },
    { value: "d", label: "Classe D" },
    { value: "e", label: "Classe E" },
  ];

  return (
    <Modal className={styles.modal} onClose={props.onClose}>
      <div className={styles.form}>
        <div>
          <span className={styles.label}>Identidade racial</span>
          <div className={styles.options}>
            {racialIdentities.map((option) => (
              <Checkbox
                key={option.value}
                name="racial_identity"
                value={option.value}
                label={option.label}
                checked={filter.racial_identity?.includes(option.value)}
                onChange={handleOnChange}
                theme="light"
              />
            ))}
          </div>
        </div>
        <div>
          <span className={styles.label}>Renda Familiar</span>
          <div className={styles.options}>
            {familyIncome.map((option) => (
              <Checkbox
                key={option.value}
                name="family_income"
                value={option.value}
                label={option.label}
                checked={filter.family_income?.includes(option.value)}
                onChange={handleOnChange}
                theme="light"
              />
            ))}
          </div>
        </div>
        <div>
          <span className={styles.label}>Deficiência</span>
          <div className={styles.options}>
            <RadioButton
              name="has_disability"
              value={"on"}
              label={"Sim"}
              checked={filter.has_disability}
              onChange={handleOnChange}
              theme="light"
            />
            <RadioButton
              name="has_disability"
              value={"off"}
              label={"Não"}
              checked={filter.has_disability === false}
              onChange={handleOnChange}
              theme="light"
            />
          </div>
        </div>
        <div>
          <span className={styles.label}>LGBT</span>
          <div className={styles.options}>
            <RadioButton
              name="is_lgbtqia"
              value={"on"}
              label={"Sim"}
              checked={filter.is_lgbtqia}
              onChange={handleOnChange}
              theme="light"
            />
            <RadioButton
              name="is_lgbtqia"
              value={"off"}
              label={"Não"}
              checked={filter.is_lgbtqia === false}
              onChange={handleOnChange}
              theme="light"
            />
          </div>
        </div>
        <div>
          <span className={styles.label}>Descendência Indígena</span>
          <div className={styles.options}>
            <RadioButton
              name="indigenous_descendancy"
              value={"on"}
              label={"Sim"}
              checked={filter.indigenous_descendancy}
              onChange={handleOnChange}
              theme="light"
            />
            <RadioButton
              name="indigenous_descendancy"
              value={"off"}
              label={"Não"}
              checked={filter.indigenous_descendancy === false}
              onChange={handleOnChange}
              theme="light"
            />
          </div>
        </div>
      </div>
      <Button className={styles["apply-button"]} onClick={filterJobs}>
        Aplicar filtro
      </Button>
    </Modal>
  );
};

export default CompanyCandidatesFilterModal;
