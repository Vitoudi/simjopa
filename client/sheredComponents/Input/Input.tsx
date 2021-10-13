import React, { ReactElement } from 'react'
import styles from "./Input.module.css"

interface Props {
    type?: string;
    value: string;
    placeholder: string;
    onValueChange: (value: string) => void; 
}

export default function Input({ type, value, onValueChange: OnValueChange, placeholder }: Props): ReactElement {
    return (
        <input className={styles["input"]} type={type || "text"} onChange={(e) => OnValueChange(e.target.value)} value={value} placeholder={placeholder}  />
    )
}
