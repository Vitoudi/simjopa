import React, {
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";
import {
  convertToRaw,
  ContentState,
  EditorState as NativeEditorState,
} from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
const EditorState = dynamic(
  () => (import("react-draft-wysiwyg").then((mod) => mod.EditorState) as any),
  { ssr: false }
);
import { AuthContext } from "./auth/AuthContext";
import { getJournalistById, getJournalistByUserId, GetJournalistDto } from "../utils/db/journalists";
import { createPost as sendRequestToCreatePost, CreatePostDto, GetPostDto, updatePost as sendRequestToUpdatePost, UpdatePostDto } from "../utils/db/posts";
import { LoginResponse, UserRole } from "../utils/db/users";
// import htmlToDraft from "html-to-draftjs";

export type PostCreationMode = "update" | "create";

export interface PostCreationAdditionalInfoForAdmins {
  journalistId: number;
}

interface PostCreationInputs {
  title: string;
  subtitle: string;
  file: File | null;
}

export interface PostCreationProps {
  setEditorState: React.Dispatch<React.SetStateAction<any>>;
  postCreationInputs: PostCreationInputs;
  setInputValueByName: (inputValueName: string, value: any) => void;
  submitPost: (creationInfoForAdmins?: PostCreationAdditionalInfoForAdmins) => Promise<LoginResponse>;
  addExistingPostForUpdate: (post: GetPostDto) => void;
  editorState: any;
  mode: PostCreationMode;
  setMode: React.Dispatch<React.SetStateAction<PostCreationMode>>;
}

export const PostCreationContext = React.createContext({} as PostCreationProps);

export default function PostCreationContextProvider({
  children,
}: PropsWithChildren<{}>): ReactElement {
  const auth = useContext(AuthContext);
  const [mode, setMode] = useState<PostCreationMode>("create");
  const [post, setPost] = useState<GetPostDto | null>(null);
  const [postCreationInputs, setPostCreationInputs] =
    useState<PostCreationInputs>({
      title: "",
      subtitle: "",
      file: null,
    });

  const [editorState, setEditorState] = useState<any>(
    () => EditorState.defaultProps
  );

  // PUBLIC:
  function setInputValueByName(name: string, value: any) {
    setPostCreationInputs((values) => {
      return { ...values, [name]: value };
    });
  }

  async function submitPost(creationInfoForAdmins?: PostCreationAdditionalInfoForAdmins) {
    if (mode === "create") {
      const res = await createPost(creationInfoForAdmins)
      return res;
    }
    
    const res = await updatePost();
    return res;
  }

  function addExistingPostForUpdate(post: GetPostDto) {
    const { htmlContent, id, imgRef, title, subtitle } = post;
    setInputValueByName("title", title);
    setInputValueByName("subtitle", subtitle);
    addHtmlContentToEditor(htmlContent);
    setPost(post);
    setMode("update");
  }


  // PRIVATE:
  function getPostHtmlContent() {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);

    return markup;
  }

  async function addHtmlContentToEditor(htmlContent: string) {
    if (!window) return;

    const htmlToDraft = await import("html-to-draftjs").then(
      (mod) => mod.default
    );

    const { contentBlocks } = htmlToDraft(htmlContent);
    if (!contentBlocks) return;

    const contentState = ContentState.createFromBlockArray(contentBlocks);
    const editorState = NativeEditorState.createWithContent(contentState);

    setEditorState(editorState);
  }

  async function createPost(
    creationInfoForAdmins?: PostCreationAdditionalInfoForAdmins
  ): Promise<LoginResponse> {
    const token = auth.getUserAuthToken();
    const user = auth.user;

    if (!token || !user)
      return {
        success: false,
        msg: "É preciso estar autenticado para criar um post",
      };

    let journalist: GetJournalistDto | null = null; 

    const isAdmin = user.role >= UserRole.ADMIN;

    if (isAdmin) {
      if (!creationInfoForAdmins)
        return {success: false, msg: "Nenhum jornalista foi selecionado"};

      journalist = await getJournalistById(creationInfoForAdmins.journalistId);
      if (!journalist) return {success: false, msg: "Jornalista não encontrado"}
    } else {
      journalist = await getJournalistByUserId(user.id);
      if (!journalist)
        return {
          success: false,
          msg: "Você não possui autorização para criar um post",
        };
    }



    const { title, subtitle, file } = postCreationInputs;
    const htmlContent = getPostHtmlContent();

    const postInfo: CreatePostDto = {
      title,
      journalistId: creationInfoForAdmins?.journalistId || journalist.id,
      committeId: journalist.committeId,
      htmlContent,
      imgFile: file,
      subtitle,
    };

    const res = await sendRequestToCreatePost(token, postInfo);
    return res;
  }

  async function updatePost(): Promise<LoginResponse> {
      if (!post) return { success: false,msg: "Post não encontrado"};

      const token = auth.getUserAuthToken();
      if (!token) return { success: false, msg: "Atorização pendente" };

      const { id } = post;
      const { title, subtitle, file } = postCreationInputs;
    const htmlContent = getPostHtmlContent();

      const objToUpdatePost: UpdatePostDto = {
          title,
          subtitle,
          id,
          htmlContent,
          imgFile: file
      }

      const res = await sendRequestToUpdatePost(token, objToUpdatePost);
      return res;
  }

  

  return (
    <PostCreationContext.Provider
      value={{
        editorState,
        setEditorState,
        postCreationInputs,
        setInputValueByName,
        submitPost,
        addExistingPostForUpdate,
        mode,
        setMode
      }}
    >
      {children}
    </PostCreationContext.Provider>
  );
}
