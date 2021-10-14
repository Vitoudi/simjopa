import React, { PropsWithChildren, ReactElement } from 'react'
import Button from '../Button/Button';
import styles from "./FormContainer.module.css";

interface Props {
    title: string;
    errorMsg?: string;
    shouldShowDefaultSubmitButton?: boolean;
    submitButtonText?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormContainer({ errorMsg, submitButtonText, shouldShowDefaultSubmitButton: showDefaultSubmitButton, title, onSubmit, children }: PropsWithChildren<Props>): ReactElement {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (onSubmit) onSubmit(e);
    }


    return (
        <form className={styles["form"]} onSubmit={handleSubmit}>
            <h2 className={styles["title"]}>{title}</h2>
            {children}
            {errorMsg && (
                <p className={styles["error-msg"]}>{errorMsg}</p>
            )}
            {showDefaultSubmitButton && <Button type="submit">{submitButtonText}</Button>}
        </form>
    )
}
