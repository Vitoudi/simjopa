import React, { PropsWithChildren, ReactElement } from 'react';
import styles from "../header.module.css";

interface Props {
    onClick: () => void;
}

export default function HeaderIcon({ children, onClick }: PropsWithChildren<Props>): ReactElement {
    return (
        <div onClick={onClick} className={styles["icon"]}>
            {children}
        </div>
    )
}
