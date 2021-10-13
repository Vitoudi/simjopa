import React, { CSSProperties, PropsWithChildren, ReactElement, useEffect } from 'react'
import { GetPostDto } from '../../utils/db/posts'
import Post from '../Post/Post';
import styles from "./PostContainer.module.css";

interface Props {
    postsList: GetPostDto[];
    title: string;

}

export default function PostsContainer({ postsList, title, children }: PropsWithChildren<Props>): ReactElement {
    
    return (
      <div className={styles["post-container-wrapper"]}>
        <h2
          className={styles["post-container-section-title"]}
        >
          {title}
        </h2>
        <div className={styles["post-container"]}>
          {postsList.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
        {children}
      </div>
    );
}
