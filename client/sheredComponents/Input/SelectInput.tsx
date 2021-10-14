import React, { PropsWithChildren, ReactElement } from "react";
import styles from "./Input.module.css";

interface Props {
  placeholder: string;
  onValueChange: (value: string) => void;
}

export default function SelectInput({ onValueChange: onValueChange,placeholder, children}: PropsWithChildren<Props>): ReactElement {
  return (
    <select onChange={(e) => onValueChange(e.target.value)} className={styles["input"]}>
        <option selected disabled value="">{placeholder}</option>
        {children}
    </select>
  );
}
