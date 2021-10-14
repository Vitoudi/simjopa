import React, { ChangeEvent, ReactElement } from 'react'
import Input from '../../../../sheredComponents/Input/Input';
import { PostCreationProps } from '../../../../globalContext/PostCreationContext'
import PostContentEditor from '../PostContentEditor/PostContentEditor';
import Button from '../../../../sheredComponents/Button/Button';
import styles from "./FormToCreatePost.module.css";
import CenteredPageContent from '../../../../sheredComponents/CenteredPageContent/CenteredPageContent';

interface Props {
    postCreationProps: PostCreationProps;
}

export default function FormToCreatePost({ postCreationProps }: Props): ReactElement {

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

    function handlePostSubmit() {
      const MAX_LENGTH_FOR_TITLE = 80;
      const MAX_LENGTH_FOR_SUBTITLE = 240;
      
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
          <Button
            additionalStyles={{ width: "46vw" }}
            onClick={submitPost}
          >
            {mode === "create" ? "Criar" : "Atualizar"}
          </Button>
        </div>
      </div>
    );
}
