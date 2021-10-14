import React, { Children, CSSProperties, PropsWithChildren, ReactElement } from 'react'
import styles from "./Button.module.css"

interface Props {
  type?: "button" | "submit" | "reset";
  additionalStyles?: CSSProperties;
  onClick?: () => void;
}

export default function Button({ type, children, onClick, additionalStyles }: PropsWithChildren<Props>): ReactElement {
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      if (type !== "submit") e.preventDefault();
      if (typeof onClick === "function") onClick();
    }

    return (
      <div>
        <button
          type={type}
          onClick={handleClick}
          style={additionalStyles}
          className={styles["button"]}
        >
          {children}
        </button>
      </div>
    );
}
