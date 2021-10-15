import React, { CSSProperties, PropsWithChildren, ReactElement } from 'react'
import styles from "./RoundedBox.module.css";

interface Props {
  additionalStyles?: CSSProperties;
  className?: string;
}

export default function RoundedBox({ children, additionalStyles, className }: PropsWithChildren<Props>): ReactElement {
    return (
      <div
        style={{
          ...additionalStyles,
        }}
        className={`${styles["rounded-box"]} ${className}`}
      >
        {children}
      </div>
    );
}
