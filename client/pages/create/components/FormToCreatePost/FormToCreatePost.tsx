import React, { ChangeEvent, PropsWithChildren, ReactElement, useState } from 'react'
import Input from '../../../../sheredComponents/Input/Input';
import { PostCreationAdditionalInfoForAdmins, PostCreationProps } from '../../../../globalContext/PostCreationContext'
import PostContentEditor from '../PostContentEditor/PostContentEditor';
import Button from '../../../../sheredComponents/Button/Button';
import styles from "./FormToCreatePost.module.css";
import CenteredPageContent from '../../../../sheredComponents/CenteredPageContent/CenteredPageContent';

interface Props {
    postCreationProps: PostCreationProps;
    creationInfoForAdmins?: PostCreationAdditionalInfoForAdmins;
}

export default function FormToCreatePost({ postCreationProps, children, creationInfoForAdmins }: PropsWithChildren<Props>): ReactElement {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!postCreationProps) {
    return (
      <CenteredPageContent>
        <h1>Algo deu errado :(</h1>
      </CenteredPageContent>
    )
  }

    const { editorState, postCreationInputs, setInputValueByName, submitPost, setEditorState, mode } = postCreationProps;

    function getFileFromChangeEvent(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files && e.target.files[0];

      return file || null;
    }

    async function handlePostSubmit() {
      const { title, subtitle, file } = postCreationInputs;
      const MAX_LENGTH_FOR_TITLE = 80;
      const MAX_LENGTH_FOR_SUBTITLE = 240;

      if (!title) return setErrorMsg("Adicione um título");
      if (!subtitle) return setErrorMsg("Adicione um resumo");
      if (!file) return setErrorMsg("Adicione um aequivo de imagem para o post");
      if (title.length > MAX_LENGTH_FOR_TITLE) return setErrorMsg(`O título é muito grande (limite de ${MAX_LENGTH_FOR_TITLE} caracteres)`);
      if (title.length > MAX_LENGTH_FOR_TITLE) return setErrorMsg(`O resumo é muito grande (limite de ${MAX_LENGTH_FOR_SUBTITLE} caracteres)`);
      if (creationInfoForAdmins && !creationInfoForAdmins.journalistId) return setErrorMsg("Selecione um jornalista");

      const res = await submitPost(creationInfoForAdmins);
      if (!res.success) return setErrorMsg(res.msg);

      setSuccessMsg(res.msg);
      setErrorMsg("");
    }

    return (
      <div style={{ margin: "20px" }}>
        <h2>Post:</h2>
        <div className={styles["form"]}>
          <div className={styles["input-container"]}>
            <Input
              placeholder="Título..."
              value={postCreationInputs?.title || ""}
              onValueChange={(value) => setInputValueByName?.("title", value)}
            />
            <Input
              placeholder="Resumo..."
              value={postCreationInputs?.subtitle || ""}
              onValueChange={(value) =>
                setInputValueByName?.("subtitle", value)
              }
            />
          </div>

          <PostContentEditor
            editorState={editorState}
            onChange={(value) => setEditorState?.(value)}
          />
          <input
            type="file"
            name="postImgFile"
            onChange={(e) =>
              setInputValueByName?.("file", getFileFromChangeEvent(e))
            }
          />
          {errorMsg && (
            <p
              style={{
                color: "darkred",
                fontWeight: "bold",
              }}
            >
              {errorMsg}
            </p>
          )}
          {successMsg && (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {successMsg}
            </p>
          )}
          {children}
          <Button additionalStyles={{ width: "46vw" }} onClick={handlePostSubmit}>
            {mode === "create" ? "Criar" : "Atualizar"}
          </Button>
        </div>
      </div>
    );
}
