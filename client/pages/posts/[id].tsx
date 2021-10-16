import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../globalContext/auth/AuthContext';
import { PostCreationContext } from '../../globalContext/PostCreationContext';
import {  getJournalistByUserId, GetJournalistDto, PostJournalistDto } from '../../utils/db/journalists';
import { deletePost, sendRequestToGetPosts, getPost, GetPostDto, increasePostVisitsNumber, updatePost } from '../../utils/db/posts';
import { getPathsFor } from '../../utils/getPathsFor';
import PostContent from './components/PostContent';
import PostHeader from './components/PostHeader';
import PostImage from './components/PostImage';
import styles from "./postPage.module.css";
import { FaTrash as DeleteIcon } from "react-icons/fa";
import { FaPen as UpdateIcon } from "react-icons/fa";
import Head from 'next/head';
import { getPostImageFullPath } from '../../utils/db/images';
import FullCentralizedLoaderSpinner from '../../sheredComponents/FullCentralizedLoaderSpinner/FullCentralizedLoaderSpinner';

export const getStaticPaths: GetStaticPaths =  async (context) => {
  context.defaultLocale
  const posts = await sendRequestToGetPosts();
  const paths = getPathsFor(posts);

  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async(context: GetStaticPropsContext) => {
    const id = context.params?.id
    const idNum = Number(id);
    const post = await getPost(idNum);

    const postWasFound = Boolean(post);

  return {
    props: { post },
    notFound: !postWasFound,
    revalidate: 10,
  };
}

interface Props {
  post: GetPostDto;
}

export default function PostPage({ post }: Props): ReactElement {
    const auth = useContext(AuthContext);
    const postCreationProps = useContext(PostCreationContext);
    const { id, imgRef, committeId, title, subtitle, createdAt, journalistId, htmlContent, committe} = post; 
    const router = useRouter();
    const imgUrl = getPostImageFullPath(imgRef || "");
    const [ journalist, setJournalist ] = useState<GetJournalistDto | null>(null);
    const currentUserIsThePostOwner = journalist?.id === journalistId;

    useEffect(() => {
        if (!post) router.replace("/");
    }, [post, router])

    useEffect(() => {
      if (!auth.user) return;
      
      getJournalistByUserId(auth.user.id).then(journalist => setJournalist(journalist))
    }, [auth]);

    useEffect(() => {
      if (!post?.id) return;
      
      increasePostVisitsNumber(post?.id);
    }, [post]);

    function handleDelete() {
        deletePost(auth.getUserAuthToken() || "" ,id);
    }

    function handleRedirectToPostUpdate() {
      const { addExistingPostForUpdate } = postCreationProps;
      if (!post) return;
      addExistingPostForUpdate(post);
      router.push("/create");
    }


    return (
      <div className={styles["post-page"]}>
        <Head>
          <title>{`${post?.title || "Post"} - AC Sinuma`}</title>
          <meta name="description" content={post?.subtitle || ""} />
          <meta property="og:title" content={post?.title || ""} />
          <meta property="og:description" content={post?.subtitle || ""} />
          <meta property="og:image" content={imgUrl} />
          <meta property="og:url" content={imgUrl} />
          <meta name="twitter:title" content={post?.title || ""} />
          <meta name="twitter:description" content={post?.subtitle || ""} />
          <meta name="twitter:image" content={imgUrl || ""} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <PostHeader
          journalistId={journalistId}
          subtitle={subtitle}
          strDate={createdAt}
          committee={committe}
          committeeId={committeId}
        >
          {title}
        </PostHeader>
        {currentUserIsThePostOwner && (
          <div className={styles["editor-area"]}>
            <div onClick={handleRedirectToPostUpdate}>
              <UpdateIcon />
              <div style={{ color: "darkslateblue" }}>Atualizar</div>
            </div>

            <div onClick={handleDelete}>
              <DeleteIcon colorInterpolation="red" />
              <div style={{ color: "darkred" }}>Deletar</div>
            </div>
          </div>
        )}
        <PostImage src={imgUrl} />
        <PostContent htmlContent={htmlContent} />
      </div>
    );
}
