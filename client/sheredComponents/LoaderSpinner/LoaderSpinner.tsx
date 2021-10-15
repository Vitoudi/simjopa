import React, { ReactElement } from 'react'
import Loader from 'react-loader-spinner'

interface Props {
    centralized?: boolean;
}

export default function LoaderSpinner({ centralized }: Props): ReactElement {
    return (
      <div style={{display: "grid", justifyContent: centralized ? "center" : "", width: centralized ? "100%" : ""}}>
        <Loader type="TailSpin" color="#003b60"></Loader>
      </div>
    );
}
