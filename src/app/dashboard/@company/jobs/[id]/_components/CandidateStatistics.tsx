import { CANDIDATE_STATISTICS_BY_JOB_GET } from "@/api";
import { CandidateStatistics } from "@/types/ICandidateStatistics";
import RacialIcon from "../../../../../../../public/racial.svg";
import MoneyIcon from "../../../../../../../public/money.svg";
import DisabilityIcon from "../../../../../../../public/disability.svg";
import LgbtIcon from "../../../../../../../public/lgbt.svg";
import CampIcon from "../../../../../../../public/camp.svg";
import styles from "./CandidateStatistics.module.css";

interface CandidateStatisticsProps {
  jobId: string;
}

const getCandidateStatisticsByJobId = async (jobId: string) => {
  const { url, options } = CANDIDATE_STATISTICS_BY_JOB_GET(jobId);
  const response = await fetch(url, options);

  if (response.ok) {
    const statistics = (await response.json()) as CandidateStatistics;

    return statistics;
  }

  return null;
};

const CandidateStatistics = async (props: CandidateStatisticsProps) => {
  const statistics = await getCandidateStatisticsByJobId(props.jobId);

  if (statistics) {
    return (
      <ul className={styles["statistic-list"]}>
        <li>
          <LgbtIcon />
          <span>
            Pessoas da comunidade LGBT: <b>{statistics.LGBTQIA}</b>
          </span>
        </li>
        <li>
          <RacialIcon />
          <span>
            Pessoas afrodescendentes: <b>{statistics.afro_descendant}</b>
          </span>
        </li>
        <li>
          <CampIcon />
          <span>
            Pessoas com descendência indígena: <b>{statistics.indigenous}</b>
          </span>
        </li>
        <li>
          <DisabilityIcon />
          <span>
            Pessoas com deficiência: <b>{statistics.disability}</b>
          </span>
        </li>
        <li>
          <MoneyIcon />
          <span>Classes sociais:</span>
          <ul>
            <li>
              B: <b>{statistics.income.b}</b>
            </li>
            <li>
              C: <b>{statistics.income.c}</b>
            </li>
            <li>
              D: <b>{statistics.income.d}</b>
            </li>
            <li>
              E: <b>{statistics.income.e}</b>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
};

export default CandidateStatistics;
