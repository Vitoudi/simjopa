import React, { ReactElement } from 'react'
import CenteredPageContent from '../../sheredComponents/CenteredPageContent/CenteredPageContent'

interface Props {
    
}

export default function ErrorPage({}: Props): ReactElement {
    return (
        <div>
            <CenteredPageContent>
                <h2 style={{textAlign: "center"}}>Conteúdo não encontrado :(</h2>
            </CenteredPageContent>
        </div>
    )
}
