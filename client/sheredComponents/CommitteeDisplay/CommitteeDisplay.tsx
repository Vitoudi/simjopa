import React, { ReactElement, useEffect } from 'react'
import { GetCommitteeDto } from '../../utils/db/committees'
import Image from "next/image";
import { getCommitteeImageFullPath } from '../../utils/db/images';
import RoundedBox from '../RoundedBox/RoundedBox';
import Link from "next/link";
import styles from "./CommitteeDisplay.module.css";

interface Props {
    committee: GetCommitteeDto;
}

export default function CommitteeDisplay({ committee }: Props): ReactElement {
    const {name, imgRef, id} = committee;
    const imgPath = getCommitteeImageFullPath(imgRef);

    return (
      <RoundedBox additionalStyles={{height: "250px"}}>
        <Link href={`/committees/${id}`} passHref>
          <div className={styles["committee-display"]}>
            <div className={styles["title-container"]}>
              <h2>{name}</h2>
            </div>
            {imgPath && (
              <Image
                className={styles["image"]}
                src={imgPath}
                width={340}
                height={260}
                objectFit="cover"
                alt="imagem do comitê"
              />
            )}
          </div>
        </Link>
      </RoundedBox>
    );
}
