import { redirect } from "next/navigation";

const DashboardCompanyPage = async () => {
  redirect("/dashboard/seek-candidates");
};

export default DashboardCompanyPage;
