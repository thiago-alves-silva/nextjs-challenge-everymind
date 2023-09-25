import Header from "@/components/Header";

const CandidateHeader = () => {
  const links = [
    { label: "Vagas", href: "/dashboard/jobs" },
    { label: "Minhas candidaturas", href: "/dashboard/candidatures" },
  ];

  return <Header links={links} />;
};

export default CandidateHeader;
