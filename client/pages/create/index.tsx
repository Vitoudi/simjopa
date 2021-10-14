import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import { PostCreationContext, PostCreationProps } from "../../globalContext/PostCreationContext";
import FormToCreatePost from "./components/FormToCreatePost/FormToCreatePost";


interface Props {}

export default function CreationPage({}: Props): ReactElement {
  const postCreationProps = useContext(PostCreationContext);

  return (
      <div>
        <FormToCreatePost postCreationProps={postCreationProps}/>
      </div>
  );
}
