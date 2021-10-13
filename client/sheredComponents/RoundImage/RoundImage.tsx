import Image from 'next/image';
import React, { ReactElement } from 'react'
import styles from "./RoundImage.module.css"

interface Props {
  src: string;
  alt: string;
  size?: number
}

export default function RoundImage({ src, alt, size }: Props): ReactElement {
    const defaultSize = 30;
    if (!size) size = defaultSize;

    return (
        <Image
          className={styles["image"]}
          width={size}
          height={size}
          objectFit="cover"
          src={src}
          alt={alt}
        />
    );
}
