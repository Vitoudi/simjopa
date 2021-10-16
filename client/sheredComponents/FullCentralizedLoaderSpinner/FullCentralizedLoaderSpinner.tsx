import React, { ReactElement } from 'react'
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner'


export default function FullCentralizedLoaderSpinner(): ReactElement {
    return (
        <div style={{minHeight: "70vh", display: "grid", justifyContent: "center", alignContent: "center"}}>
            <LoaderSpinner/>
        </div>
    )
}
