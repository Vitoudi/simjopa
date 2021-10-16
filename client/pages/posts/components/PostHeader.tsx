import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import styles from "../postPage.module.css";
import PostJournalistHeaderDisplay from "./PostJournalistHeaderDisplay"
import Link from "next/link";


interface Props  {
    subtitle: string;
    journalistId?: number;
    strDate: string;
    committee: string;
    committeeId: number;
    title: string;
}

export default function PostHeader({ title, subtitle, committeeId, journalistId, strDate, committee }: Props): ReactElement {
  const date = new Date(strDate).toLocaleDateString();

    return (
      <div className={styles["header-area"]}>
        <p className={styles["top-info"]}>
          <Link href={`/committees/${committeeId}`} passHref>
            <span className={styles["committee"]}>{committee}</span>
          </Link>
          {" - "}
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
