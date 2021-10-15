import { GetStaticProps, GetStaticPropsContext } from "next";
import React, { ReactElement, useContext, useState } from "react";
import { AuthContext } from "../../globalContext/auth/AuthContext";
import { PostCreationContext } from "../../globalContext/PostCreationContext";
import FileInput from "../../sheredComponents/FileInput/FileInput";
import Input from "../../sheredComponents/Input/Input";
import SelectInput from "../../sheredComponents/Input/SelectInput";
import { sendRequestToCreateCommittee } from "../../utils/db/committees";
import { GetJournalistDto, getJournalists } from "../../utils/db/journalists";
import styles from "./AdminPage.module.css"
import FormToCreatePost from "../create/components/FormToCreatePost/FormToCreatePost";
import Button from "../../sheredComponents/Button/Button";


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const journalists = (await getJournalists()) || [];

  return {props: {journalists}, revalidate: 10}
}

interface Props {
  journalists: GetJournalistDto[];
}

export default function AdminPage({ journalists }: Props): ReactElement {
  const auth = useContext(AuthContext);
  const postCreationProps = useContext(PostCreationContext);
  const [committeeName, setCommitteeName] = useState("");
  const [committeeImgFile, setCommitteeImgFile] = useState<File | null>(null);
  const [journalistId, setJournalistId] = useState<number>(0);

  function handleSubmit() {
    const token = auth.getUserAuthToken();
    if (!token) return;
    if (!committeeImgFile) return;

    sendRequestToCreateCommittee(token, {
      imgFile: committeeImgFile,
      name: committeeName,
    });
  }

  function handleJournalistChange(value: string) {
    const valueNumber = Number(value);
    if (isNaN(valueNumber)) return;
    setJournalistId(valueNumber);
  }

  return (
    <div className={styles["page"]}>
      <div className={styles["create-committee-area"]}>
        <h2>Criar comitê:</h2>
        <Input
          placeholder="nome"
          value={committeeName}
          onValueChange={setCommitteeName}
        />
        <FileInput onNewFileSelected={setCommitteeImgFile}></FileInput>

        <Button onClick={handleSubmit}>Criar</Button>
      </div>
      <div>
        <FormToCreatePost postCreationProps={postCreationProps} creationInfoForAdmins={{
          journalistId
        }}>
          <SelectInput placeholder="Jornalista" onValueChange={handleJournalistChange}>
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>{journalist.name}</option>
          ))}
          </SelectInput>
        </FormToCreatePost>
      </div>
    </div>
  );
}
