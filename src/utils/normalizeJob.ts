import { ExperienceLevel } from "@/types/ExperienceLevel";
import { Job, JobApi } from "@/types/IJob";
import { WorkModel } from "@/types/WorkModel";

const normalizeJob = (jobApi: JobApi): Job => {
  const job: Job = {
    id: jobApi._id,
    id_company: jobApi.id_company,
    title: jobApi.title,
    state: jobApi.state,
    city: jobApi.city,
    deadline_date: new Date(jobApi.deadline_date),
    experience_level: jobApi.experience_level as ExperienceLevel,
    work_model: jobApi.work_model as WorkModel,
    salary: Number(jobApi.salary),
    description: jobApi.description,
    steps: jobApi.steps,
    createdAt: new Date(jobApi.createdAt),
    active: jobApi.active,
  };

  return job;
};

export default normalizeJob;
