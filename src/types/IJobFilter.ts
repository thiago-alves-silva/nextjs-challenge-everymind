import { ExperienceLevel } from "./ExperienceLevel";
import { WorkModel } from "./WorkModel";

export interface JobFilter {
  announcement_time: AnnouncementTime | null;
  experience_level: ExperienceLevel | null;
  work_model: WorkModel | null;
  location: string | null;
}

type AnnouncementTime = "" | "last_day" | "last_week" | "last_month";
