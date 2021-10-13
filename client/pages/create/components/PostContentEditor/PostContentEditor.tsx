import Draft, { DraftHandleValue, EditorState, RichUtils, Modifier, getDefaultKeyBinding } from 'draft-js';
import React, { BaseSyntheticEvent, KeyboardEvent, ReactElement, SyntheticEvent, useRef, useState } from 'react'
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import styles from "./PostContentEditor.module.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



interface Props {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
}

export default function PostContentEditor({ editorState, onChange }: Props): ReactElement {


    return (
          <Editor
            // keyBindingFn={(e) => handleKeyPress(e)}
            // handleKeyCommand={handleKeyCommand}
            wrapperClassName={styles["editor-container"]}
            onEditorStateChange={onChange}
            editorState={editorState}
            placeholder="Conteúdo..."
          />
    );
}
