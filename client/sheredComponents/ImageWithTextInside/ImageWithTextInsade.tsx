import React, { ReactElement } from 'react';
import styles from "./ImageWithTextInside.module.css";
import Image, { ImageProps } from "next/image";

interface Props {
    imageProps: ImageProps;
    className?: string;
    text: string;
}


export default function ImageWithTextInside({ imageProps}: Props): ReactElement {
    const { src, alt, objectFit, width, height  } = imageProps;
    return (
        <div>
            <Image src={src as any} alt={alt} width={width} height={height} objectFit={objectFit} />
        </div>
    )
}
