import { GetStaticPropsContext } from 'next';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import { GetPostDto } from '../../../utils/db/posts';
import styles from "../postPage.module.css";
import PostJournalistHeaderDisplay from "./PostJournalistHeaderDisplay"
import Link from "next/link";


interface Props  {
    post: GetPostDto
}

export default function PostHeader({ post }: PropsWithChildren<Props>): ReactElement {
  const { createdAt, committe, title, subtitle, journalistId, committeId } = post;
  const date = new Date(createdAt).toLocaleDateString();

    return (
      <div className={styles["header-area"]}>
        <p className={styles["date"]}>
          <Link href={`/committees/${committeId}`}>{committe}</Link>
          {" - "}
          {date}
        </p>
        <h1 className={styles["title"]}>{title}</h1>
        <h3 className={styles["subtitle"]}>{subtitle}</h3>

        {journalistId && (
          <PostJournalistHeaderDisplay journalistId={journalistId} />
        )}
      </div>
    );
}
