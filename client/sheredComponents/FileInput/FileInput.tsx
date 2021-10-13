import React, { PropsWithChildren, ReactElement, useRef } from 'react'

interface Props {
    name?: string;
    onNewFileSelected: (file: File) => void;
}

export default function FileInput({ name, children, onNewFileSelected }: PropsWithChildren<Props>): ReactElement {
    const fileInputRef =
      useRef<HTMLInputElement>(null);

    function handleClick() {
        const inputElement = fileInputRef.current;
        if (!inputElement) return;

        inputElement.click();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (file) onNewFileSelected(file);
    }

    return (
      <div>
        <div style={{cursor: "pointer"}} onClick={handleClick}>{children}</div>
        <input ref={fileInputRef} style={{ display: children ? "none" : "block"  }} type="file" name={name} id={name} onChange={handleChange} />
      </div>
    );
}
