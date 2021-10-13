import React, { ReactElement, useEffect } from 'react'
import { GetJournalistDto } from '../../utils/db/journalists'
import Image from "next/image"
import { getImageFullPath } from '../../utils/db/images';
import styles from "./JournalistDisplay.module.css";
import RoundedBox from '../RoundedBox/RoundedBox';
import Link from "next/link"
import SmallDisplay from '../SmallDisplay/SmallDisplay';

interface Props {
    journalist: GetJournalistDto;
}

export default function JournalistDisplay({ journalist }: Props): ReactElement {
    const { imgRef, name, id } = journalist;
    const imgPath = imgRef && getImageFullPath(imgRef);

    useEffect(() => console.log(imgPath), [imgPath]);

    return (
      <SmallDisplay href={`/journalist/${id}`} text={name} imgPath={imgPath || ""} />
    );
}
