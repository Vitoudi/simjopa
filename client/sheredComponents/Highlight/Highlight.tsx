import React, { PropsWithChildren, ReactElement } from 'react'

interface Props {
    children: PropsWithChildren<string | Text>;
    fontSize?: number;
}

export default function Highlight({ children, fontSize }: Props): ReactElement {
    return (
        <span style={{fontWeight: "bold", fontSize: fontSize}}>{children}</span>
    )
}
