import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import styles from "../postPage.module.css";
import PostJournalistHeaderDisplay from "./PostJournalistHeaderDisplay"
import Link from "next/link";
import { GetPostDto } from '../../../utils/db/posts';


interface Props  {
    post: GetPostDto;
}

export default function PostHeader({ post }: Props): ReactElement {
  const { createdAt, title, subtitle, committe, committeId, journalistId } = post;
  const date = new Date(createdAt).toLocaleDateString();

    return (
      <div className={styles["header-area"]}>
        <p className={styles["top-info"]}>
          <span className={styles["committee"]}>
            <Link href={`/committees/${committeId}`} passHref>
              {committe}
            </Link>
            {" - "}
          </span>
          <span className={styles["date"]}>{date}</span>
        </p>
        <h1 className={styles["title"]}>{title}</h1>
        <h3 className={styles["subtitle"]}>{subtitle}</h3>

        {journalistId && (
          <PostJournalistHeaderDisplay journalistId={journalistId} />
        )}
      </div>
    );
}
