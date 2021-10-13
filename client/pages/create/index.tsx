import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../globalContext/auth/AuthContext";
import { createJournalist, getJournalistById, getJournalistByUserId } from "../../utils/db/journalists";
import { createPost } from "../../utils/db/posts";
import useHtmlGenerator from "../../hooks/useHtmlGenerator"
import { Editor, EditorState, RichUtils } from "draft-js"
import "draft-js/dist/Draft.css";
import PostContentEditor from "./components/PostContentEditor/PostContentEditor";
import Input from "../../sheredComponents/Input/Input";
import PostCreationContextProvider, { PostCreationContext, PostCreationProps } from "../../globalContext/PostCreationContext";
import FormToCreatePost from "./components/FormToCreatePost/FormToCreatePost";


interface Props {}

export default function CreationPage({}: Props): ReactElement {

  return (
      <PostCreationContext.Consumer>
        {(postCreationProps: PostCreationProps) => (
          <div>
            <FormToCreatePost postCreationProps={postCreationProps}/>
          </div>
        )}
      </PostCreationContext.Consumer>
  );
}
