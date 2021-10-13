import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement, useEffect, useState } from 'react'
import Post from '../../sheredComponents/Post/Post';
import PostsContainer from '../../sheredComponents/postsContainer/PostsContainer';
import { GetPostDto, sendRequestToGetPosts } from '../../utils/db/posts';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const hot = context.query["hot"];
  const shouldLoadHotPosts = hot === "true";

  return {props: { shouldLoadHotPosts }};
}

interface Props {
    shouldLoadHotPosts: boolean;
}

export default function PostsPage({ shouldLoadHotPosts }: Props): ReactElement {
    const POSTS_PER_REQUEST = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState<GetPostDto[]>([]);

    useEffect(() => {
            getPosts();
    }, [])

    useEffect(() => {
        console.log("use effect called");
        if (!window) return;

        function scrollCallback() {
            {
              const windowBottom = window.innerHeight + window.scrollY;
              const bodyHeight = document.body.offsetHeight;

              if (windowBottom >= bodyHeight) {
                getPosts();
              }
            }
        }

        window.addEventListener("scroll", scrollCallback);

        return () => {
            window.removeEventListener("scroll", scrollCallback);
        }
    }, [currentPage])


    async function getPosts() {
        const posts = await sendRequestToGetPosts({limit: POSTS_PER_REQUEST, page: currentPage, hot: shouldLoadHotPosts});
        const thereAreNoPosts = posts.length === 0;
        if (thereAreNoPosts) return;
        setPosts((prevPosts) => [...prevPosts, ...posts]);
        setCurrentPage(currentPage + 1);
        return posts;
    } 

    return (
        <div>
            <PostsContainer postsList={posts} title="Todos:" />
        </div>
    )
}
