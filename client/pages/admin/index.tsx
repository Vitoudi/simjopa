import React, { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../globalContext/auth/AuthContext";
import FileInput from "../../sheredComponents/FileInput/FileInput";
import Input from "../../sheredComponents/Input/Input";
import { sendRequestToCreateCommittee } from "../../utils/db/committees";

interface Props {}

export default function AdminPage({}: Props): ReactElement {
  const auth = useContext(AuthContext);
  const [committeeName, setCommitteeName] = useState("");
  const [committeeImgFile, setCommitteeImgFile] = useState<File | null>(null);

  function handleSubmit() {
    const token = auth.getUserAuthToken();
    if (!token) return;
    if (!committeeImgFile) return;

    sendRequestToCreateCommittee(token, {
      imgFile: committeeImgFile,
      name: committeeName,
    });
  }

  return (
    <div>
      <Input
        placeholder="nome"
        value={committeeName}
        onValueChange={setCommitteeName}
      />
      <FileInput onNewFileSelected={setCommitteeImgFile}>
        <b>Aqui!</b>
      </FileInput>
      <button onClick={handleSubmit}>Criar</button>
    </div>
  );
}
