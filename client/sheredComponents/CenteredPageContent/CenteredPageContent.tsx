import React, { PropsWithChildren, ReactElement } from 'react'

interface Props {
    
}

export default function CenteredPageContent({ children }: PropsWithChildren<{}>): ReactElement {
    return (
        <div style={{
            display: "grid",
            minHeight: "65vh",
            justifyContent: "center",
            alignContent: "center"
        }}>
            {children}
        </div>
    )
}
