"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { DISABLE_JOB_PUT } from "@/api";
import { useRouter } from "next/navigation";

interface DisableButtonProps {
  job_id: string;
}

const DisableButton = (props: DisableButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const disableJob = async () => {
    setLoading(true);

    const { url, options } = DISABLE_JOB_PUT(props.job_id);
    const response = await fetch(url, options);

    if (response.ok) {
      router.push("/dashboard/jobs");
    }

    setLoading(false);
  };

  return (
    <Button variant="secondary" onClick={disableJob} disabled={loading}>
      Excluir vaga
    </Button>
  );
};

export default DisableButton;
