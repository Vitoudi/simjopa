import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { ReactElement, useEffect, useState } from 'react'
import { getJournalists, getJournalistById, GetJournalistDto, getJournalistImgPath } from '../../utils/db/journalists';
import { getPathsFor } from '../../utils/getPathsFor';
import RoundImage from '../../sheredComponents/RoundImage/RoundImage';
import { GetPostDto, getPostsByJournalist } from '../../utils/db/posts';
import Post from '../../sheredComponents/Post/Post';
import { getUserImageFullPath } from '../../utils/db/images';
import LoaderSpinner from '../../sheredComponents/LoaderSpinner/LoaderSpinner';
import Head from "next/head";
import styles from "./JournalistPage.module.css";
import PostsContainer from '../../sheredComponents/postsContainer/PostsContainer';

export const getStaticPaths: GetStaticPaths =  async () => {
  const journalists = await getJournalists();
  const paths = getPathsFor(journalists);

  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id;
  const idNum = Number(id);
  const journalist = await getJournalistById(idNum);

  return {
    props: { journalist },
    notFound: !Boolean(journalist),
    revalidate: 10,
  };
};

interface Props {
    journalist: GetJournalistDto | null
}

export default function JournalistPage({ journalist }: Props): ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [journalistsPosts, setJournalistPosts] = useState<GetPostDto[]>([]);


    const imgUrl = getUserImageFullPath(journalist?.imgRef || undefined);

    async function getJournalistPosts() {
        if (!journalist) return;
        setIsLoading(true);
        const posts = await getPostsByJournalist(journalist.id);
        setIsLoading(false);
        if (posts) setJournalistPosts(posts);
         
    }

    useEffect(() => {
      getJournalistPosts()
    }, [])

    return (
      <div className="page">
        <Head>
          <title>{`${
            journalist?.name || "Jornalista"
          } - Lecteur Mariste`}</title>
          <meta name="description" content="Página de jornalista" />
        </Head>
        <div className={styles["info"]}>
          <h1 className={styles["journalist-name"]}>{journalist?.name}</h1>
          <RoundImage src={imgUrl} size={120} alt="journalist image" />
        </div>

        <div style={{ marginTop: "2.5rem" }}>
          {!isLoading ? (
            <PostsContainer title="Posts:" postsList={journalistsPosts} />
          ) : (
            <div style={{ marginTop: "3rem" }}>
              <LoaderSpinner centralized={true} />
            </div>
          )}
        </div>
      </div>
    );
}
