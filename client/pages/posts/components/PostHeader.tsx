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
}

export default function PostHeader({ children, subtitle, committeeId, journalistId, strDate, committee }: PropsWithChildren<Props>): ReactElement {
  const date = new Date(strDate).toLocaleDateString();

    return (
      <div className={styles["header-area"]}>
        <p className={styles["top-info"]}>
          <span className={styles["committee"]}>
            <Link href={`/committees/${committeeId}`} passHref>
              {committee}
            </Link>
            {" - "}
          </span>
          <span className={styles["date"]}>{date}</span>
        </p>
        <h1 className={styles["title"]}>{children}</h1>
        <h3 className={styles["subtitle"]}>{subtitle}</h3>

        {journalistId && (
          <PostJournalistHeaderDisplay journalistId={journalistId} />
        )}
      </div>
    );
}
