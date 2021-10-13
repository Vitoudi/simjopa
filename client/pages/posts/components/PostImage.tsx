import Image from 'next/image';
import React, { ReactElement } from 'react'

interface Props {
    src: string;
}

export default function PostImage({src}: Props): ReactElement {
    return (
      <div style={{ width: "100vw", height: "60vh", position: "relative" }}>
        <Image
          placeholder="blur"
          blurDataURL={src}
          alt="post-image"
          layout="fill"
          src={src}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    );
}
