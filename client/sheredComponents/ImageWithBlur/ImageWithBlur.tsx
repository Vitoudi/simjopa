import Image from 'next/image';
import React, { ReactElement } from 'react'

interface Props {
  src: string;
  alt: string;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  width?: number;
  height?: number;
}

export default function ImageWithBlur({ alt, src, layout, width, height }: Props): ReactElement {
    return (
      <Image
        placeholder="blur"
        blurDataURL={src}
        alt="post-image"
        layout="fill"
        src={src}
        objectFit="cover"
        objectPosition="center"
      />
    );
}
