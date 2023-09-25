"use client";
import Button from "@/components/Button";
import ApplyModal from "./ApplyModal";
import { useState } from "react";

interface ApplyButtonProps {
  jobId: string;
  disabled: boolean;
}

const ApplyButton = (props: ApplyButtonProps) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowApplyModal(true)} disabled={props.disabled}>
        Quero me candidatar
      </Button>
      {showApplyModal && (
        <ApplyModal
          jobId={props.jobId}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  );
};

export default ApplyButton;
