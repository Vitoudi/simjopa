import React, { ReactElement } from 'react'
import styles from "../postPage.module.css";

interface Props {
    htmlContent: string
}

export default function PostContent({ htmlContent }: Props): ReactElement {
    return (
      <main
        className={styles["content"]}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
}
