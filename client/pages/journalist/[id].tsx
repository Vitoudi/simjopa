import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React, { ReactElement, useEffect, useState } from 'react'
import { getJournalists, getJournalistById, GetJournalistDto, getJournalistImgPath } from '../../utils/db/journalists';
import { getPathsFor } from '../../utils/getPathsFor';
import RoundImage from '../../sheredComponents/RoundImage/RoundImage';
import { GetPostDto, getPostsByJournalist } from '../../utils/db/posts';
import Post from '../../sheredComponents/Post/Post';
import { getUserImageFullPath } from '../../utils/db/images';

export const getStaticPaths: GetStaticPaths =  async () => {
  const journalists = await getJournalists();
  const paths = getPathsFor(journalists);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;
  const idNum = Number(id);
  const journalist = await getJournalistById(idNum);

  return {
    props: { journalist },
    revalidate: 10,
  };
}

interface Props {
    journalist: GetJournalistDto | null
}

export default function JournalistPage({ journalist }: Props): ReactElement {
    const [journalistsPosts, setJournalistPosts] = useState<GetPostDto[]>([]);


    const imgUrl = getUserImageFullPath(journalist?.imgRef || undefined);

    async function getJournalistPosts() {
        if (!journalist) return;
        const posts = await getPostsByJournalist(journalist.id);
        if (posts) setJournalistPosts(posts); 
    }

    useEffect(() => {
      getJournalistPosts()
    }, [])

    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>{journalist?.name}</h1>
        <RoundImage src={imgUrl} size={120} alt="journalist image" />
        <div style={{marginTop: "2.5rem", display: "grid"}}>
          <h2>Posts:</h2>
          <section style={{ display: "flex", flexWrap: "wrap", marginTop: "1rem", alignContent: "center", justifyContent: "center" }}>
            {journalistsPosts.map((postInfo) => (
              <Post key={postInfo.id} post={postInfo} />
            ))}
          </section>
        </div>
      </div>
    );
}
