import { Candidature } from "@/types/ICandidature";
import { CANDIDATURE_POST } from "@/api";
import { useState } from "react";
import CurriculumSent from "./CurriculumSent";
import Modal from "@/components/Modal";
import SendCurriculum from "./SendCurriculum";
import getBase64FromFile from "@/utils/getBase64FromFile";
import getUserFromTokenOnClientSide from "@/utils/getUserFromTokenOnClientSide";
import displayNotification from "@/utils/displayNotification";

interface ApplyModalProps {
  jobId: string;
  onClose: React.MouseEventHandler;
}

const ApplyModal = (props: ApplyModalProps) => {
  const [file, setFile] = useState<File>();
  const [curriculumSent, setCurriculumSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSelectFile: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files?.length) {
      const file = target.files.item(0)!;

      if (file.type === "application/pdf") {
        setFile(target.files[0]);
      }
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const user = getUserFromTokenOnClientSide();

      if (user) {
        setLoading(true);

        const base64 = (await getBase64FromFile(file)) ?? "";
        const payload: Omit<Candidature, "_id"> = {
          candidate_id: user.id,
          job_id: props.jobId,
          current_step: 0,
          answers: [],
          feedback: "",
          curriculum: base64,
        };

        const { url, options } = CANDIDATURE_POST(props.jobId, payload);
        const response = await fetch(url, options);

        if (response.ok) {
          setCurriculumSent(true);
        } else {
          displayNotification({
            text: "Erro ao realizar a candidatura",
            type: "error",
          });
        }

        setLoading(false);
      }
    }
  };

  return (
    <Modal onClose={props.onClose}>
      {curriculumSent ? (
        <CurriculumSent />
      ) : (
        <SendCurriculum
          file={file}
          onSelectFile={onSelectFile}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </Modal>
  );
};

export default ApplyModal;
