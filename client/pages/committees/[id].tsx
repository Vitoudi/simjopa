import { GetStaticPropsContext } from 'next';
import React, { ReactElement, useEffect, useState } from 'react'
import { GetCommitteeDto, sendRequestToGetCommittee, sendRequestToGetCommittees } from '../../utils/db/committees';
import { getJournalists } from '../../utils/db/journalists';
import { getPathsFor } from '../../utils/getPathsFor';
import { GetJournalistDto } from "../../utils/db/journalists"
import JournalistDisplay from '../../sheredComponents/JournalistDisplay/JournalistDisplay';
import { GetPostDto, sendRequestToGetPosts } from '../../utils/db/posts';
import Image from "next/image";
import { getImageFullPath } from '../../utils/db/images';
import styles from "./CommitteesPage.module.css";
import PostsContainer from '../../sheredComponents/postsContainer/PostsContainer';

export async function getStaticPaths() {
  const committees = await sendRequestToGetCommittees();
  const paths = getPathsFor(committees);

  return { paths, fallback: "blocking" };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;
  const idNum = Number(id);
  const committee = await sendRequestToGetCommittee(idNum);

  return {
    props: { committee },
    revalidate: 10,
  };
}

interface Props {
    committee: GetCommitteeDto;
}

export default function CommitteePage({ committee }: Props): ReactElement {
  const [journalists, setJournalists] = useState<GetJournalistDto[]>([]);
  const [posts, setPosts] = useState<GetPostDto[]>([]);

  useEffect(() => {
    getJournalists({committeId: committee.id}).then(result => result && setJournalists(result));
    sendRequestToGetPosts({committeId: committee.id}).then(posts => setPosts(posts));
  }, [])

  const imgPath = getImageFullPath(committee.imgRef);

    return (
      <div>
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

        <div className={styles["journalists-container-wrapper"]}>
          <h2 style={{marginBottom: "1rem"}}>Jornalistas:</h2>
          <div className={styles["journalists-container"]}>
            {journalists.map((journalist) => (
              <JournalistDisplay key={journalist.id} journalist={journalist} />
            ))}
          </div>
        </div>

        <PostsContainer title="Posts:" postsList={posts} />
      </div>
    );
}