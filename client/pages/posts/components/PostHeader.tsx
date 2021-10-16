import { GetStaticPropsContext } from 'next';
import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import styles from "../postPage.module.css";
import PostJournalistHeaderDisplay from "./PostJournalistHeaderDisplay"


interface Props  {
    subtitle: string;
    journalistId?: number;
    strDate: string;
    committee: string;
    children: PropsWithChildren<Text | string>;
}

export default function PostHeader({ children, subtitle, journalistId, strDate, committee }: Props): ReactElement {
  const date = new Date(strDate).toLocaleDateString();

    return (
      <div className={styles["header-area"]}>
        <p className={styles["date"]}>
          {committee}{" - "}
          {date}
        </p>
        <h1 className={styles["title"]}>{children}</h1>
        <h3 className={styles["subtitle"]}>{subtitle}</h3>

        {journalistId && (
          <PostJournalistHeaderDisplay journalistId={journalistId} />
        )}
      </div>
    );
}
