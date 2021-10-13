import React, { ChangeEvent, ReactElement } from 'react'
import Input from '../../../../sheredComponents/Input/Input';
import { PostCreationProps } from '../../../../globalContext/PostCreationContext'
import PostContentEditor from '../PostContentEditor/PostContentEditor';
import Button from '../../../../sheredComponents/Button/Button';

interface Props {
    postCreationProps: PostCreationProps;
}

export default function FormToCreatePost({ postCreationProps }: Props): ReactElement {

    const { editorState, postCreationInputs, setInputValueByName, submitPost, setEditorState, mode } = postCreationProps;

    function getFileFromChangeEvent(e: ChangeEvent<HTMLInputElement>) {
      const file = e.target.files && e.target.files[0];

      return file || null;
    }


    return (
      <div style={{ margin: "20px" }}>
        <h2>Post</h2>
        <div>
          <Input
            placeholder="Título..."
            value={postCreationInputs?.title || ""}
            onValueChange={(value) => setInputValueByName?.("title", value)}
          />
          <Input
            placeholder="Resumo..."
            value={postCreationInputs?.subtitle || ""}
            onValueChange={(value) => setInputValueByName?.("subtitle", value)}
          />
          <PostContentEditor
            editorState={editorState}
            onChange={(value) => setEditorState?.(value)}
          />
        </div>
        <Button onClick={submitPost}>{mode === "create" ? "Criar" : "Atualizar"}</Button>
        <input
          type="file"
          name="postImgFile"
          onChange={(e) =>
            setInputValueByName?.("file", getFileFromChangeEvent(e))
          }
        />
      </div>
    );
}
