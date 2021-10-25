import { GetStaticProps, GetStaticPropsContext } from "next";
import React, { ReactElement, useEffect, useState } from "react";
import {
  GetCommitteeDto,
  sendRequestToGetCommittee,
  sendRequestToGetCommittees,
} from "../../utils/db/committees";
import { getJournalists } from "../../utils/db/journalists";
import { getPathsFor } from "../../utils/getPathsFor";
import { GetJournalistDto } from "../../utils/db/journalists";
import JournalistDisplay from "../../sheredComponents/JournalistDisplay/JournalistDisplay";
import { GetPostDto, sendRequestToGetPosts } from "../../utils/db/posts";
import Image from "next/image";
import styles from "./CommitteesPage.module.css";
import PostsContainer from "../../sheredComponents/postsContainer/PostsContainer";
import { getCommitteeImageFullPath } from "../../utils/db/images";
import Head from "next/head";
import LoaderSpinner from "../../sheredComponents/LoaderSpinner/LoaderSpinner";

export async function getStaticPaths() {
  const committees = await sendRequestToGetCommittees();
  const paths = getPathsFor(committees);

  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id;
  const idNum = Number(id);
  const committee = await sendRequestToGetCommittee(idNum);

  return {
    props: { committee },
    notFound: !Boolean(committee),
    revalidate: 10,
  };
};

interface Props {
  committee: GetCommitteeDto;
}

export default function CommitteePage({ committee }: Props): ReactElement {
  const [journalists, setJournalists] = useState<GetJournalistDto[]>([]);
  const [posts, setPosts] = useState<GetPostDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getJournalists({ committeId: committee.id }).then(
      (result) => result && setJournalists(result)
    );
    sendRequestToGetPosts({ committeId: committee.id }).then((posts) =>
      setPosts(posts)
    );
    setIsLoading(false);
  }, []);

  const imgPath = getCommitteeImageFullPath(committee.imgRef);

  return (
    <div>
      <Head>
        <title>{`${committee?.name || "Comitê"} - Lecteur Mariste`}</title>
        <meta name="description" content="Página de comitê" />
      </Head>
      <div className={styles["banner-container"]}>
        <Image
          src={imgPath}
          layout="fill"
          objectFit="cover"
          alt="imagem comitê"
          className={styles["image"]}
        />

        <h1 className={styles["title"]}>{committee.name}</h1>
      </div>

      {!isLoading ? (
        <>
          <div className={styles["journalists-container-wrapper"]}>
            <h2 style={{ marginBottom: "1rem" }}>Jornalistas:</h2>
            <div className={styles["journalists-container"]}>
              {journalists.map((journalist) => (
                <JournalistDisplay
                  key={journalist.id}
                  journalist={journalist}
                />
              ))}
            </div>
          </div>

          <PostsContainer title="Posts:" postsList={posts} />
        </>
      ) : (
        <div style={{marginTop: "2rem"}}>
          <LoaderSpinner centralized={true} />
        </div>
      )}
    </div>
  );
}
