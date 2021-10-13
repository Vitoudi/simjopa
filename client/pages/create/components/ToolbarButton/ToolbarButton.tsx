import React, { PropsWithChildren, ReactElement } from 'react'
import styles from "./ToolbarButton.module.css"

interface Props {
    onClick: () => void;
}

export default function ToolbarButton({ children, onClick }: PropsWithChildren<Props>): ReactElement {
    return (
        <button className={styles['toolbar-button']} onClick={onClick}>
            {children}
        </button>
    )
}
