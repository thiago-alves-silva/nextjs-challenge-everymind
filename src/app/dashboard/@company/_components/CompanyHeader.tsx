import Header from "@/components/Header";

const CompanyHeader = () => {
  const links = [
    { label: "Buscar candidatos", href: "/dashboard/seek-candidates" },
    { label: "Vagas", href: "/dashboard/jobs" },
  ];

  return <Header links={links} />;
};

export default CompanyHeader;
