import React, { PropsWithChildren, ReactElement } from 'react'
import styles from "./BottomFormMsg.module.css";
import Link from "next/link";

interface Props {
    redirectMsg: string;
    href: string;
}

export default function BottomFormMsg({ redirectMsg, href, children }: PropsWithChildren<Props>): ReactElement {
    return (
      <p className={styles["bottom-form-msg"]}>
        {children}{" "}
        <span className={styles["redirect-msg"]}>
          <Link href={href}>{redirectMsg}</Link>
        </span>
      </p>
    );
}
