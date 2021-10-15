import React, { ReactElement } from 'react'
import styles from "./Input.module.css"

interface Props {
    type?: string;
    value: string;
    placeholder: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export default function Input({ type, value, onValueChange: OnValueChange, placeholder, className }: Props): ReactElement {
    return (
      <input
        className={`${styles["input"]} ${className}`}
        type={type || "text"}
        onChange={(e) => OnValueChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    );
}
