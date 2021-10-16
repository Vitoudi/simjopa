import React, { ReactElement } from 'react'
import Loader from 'react-loader-spinner'

interface Props {
    centralized?: boolean;
    size?: "big" | "normal" | "small";
}

export default function LoaderSpinner({ centralized, size }: Props): ReactElement {
    const sizeStr = getSize()

    function getSize() {
        switch(size) {
            case "small":
                return "2rem"
            case "big":
                return "6rem"
            default:
                return "3.5rem"
        }
    }

    return (
      <div style={{display: "grid", justifyContent: centralized ? "center" : "", width: centralized ? "100%" : ""}}>
        <Loader width={sizeStr} height={sizeStr} type="TailSpin" color="#003b60"></Loader>
      </div>
    );
}
