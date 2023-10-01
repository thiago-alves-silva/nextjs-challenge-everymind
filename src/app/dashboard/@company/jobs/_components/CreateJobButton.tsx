"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const CreateJobButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/dashboard/jobs/create")}>
      Nova vaga
    </Button>
  );
};

export default CreateJobButton;
