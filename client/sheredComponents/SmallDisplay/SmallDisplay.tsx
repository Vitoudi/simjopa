import React, { ReactElement } from 'react'
import RoundedBox from '../RoundedBox/RoundedBox';
import Image from "next/image";
import Link from "next/link";
import styles from "./SmallDisplay.module.css";

interface Props {
    text: string;
    imgPath: string;
    href: string;
}

export default function SmallDisplay({ text, imgPath, href }: Props): ReactElement {
    return (
      <RoundedBox additionalStyles={{width: "250px", overflow: "unset"}}>
       <Link href={href} passHref>
          <div className={styles["small-display"]}>
            {imgPath && (
              <Image
              className={styles["image"]}
                src={imgPath}
                width={70}
                height={70}
                objectFit="cover"
                alt="imagem journalista"
              />
            )}
            <h3 className={styles["text"]}>{text}</h3>
          </div>
        </Link>
      </RoundedBox>
    );
}
