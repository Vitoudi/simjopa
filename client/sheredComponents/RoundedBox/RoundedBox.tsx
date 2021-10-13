import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react'
import styles from "./RoundedBox.module.css";

interface Props {
  additionalStyles?: CSSProperties;
}

export default function RoundedBox({ children, additionalStyles }: PropsWithChildren<Props>): ReactElement {
    return (
        <div style={{
            ...additionalStyles
        }} className={styles["rounded-box"]}>
            {children}
        </div>
    )
}
