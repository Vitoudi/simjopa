import Image from 'next/image'
import React, { ReactElement } from 'react'
import { API_URL } from '../../utils/db/apiRef';
import styles from "../Post/post.module.css";
import Link from "next/link"
import { GetPostDto } from '../../utils/db/posts';
import RoundedBox from '../RoundedBox/RoundedBox';
import { getPostImageFullPath } from '../../utils/db/images';

interface Props {
   post: GetPostDto; 
}

export default function Post({ post }: Props): ReactElement {
    const {imgRef, id} = post;
    const imgUrl = getPostImageFullPath(imgRef || undefined);
    const title = getFormattedText(post.title, 65);
    const subtitle = getFormattedSubtitle();

      function getFormattedText(text: string, maxLength: number) {
        const subtitleIsTooBig = text.length > maxLength;
        
        if (subtitleIsTooBig) return text.slice(0, maxLength) + "...";

        return text;
      }

      function getFormattedSubtitle() {
        if (title.length > 50) return getFormattedText(post.subtitle, 40);
        return getFormattedText(post.subtitle, 60); 
      }

    console.log(imgUrl);

    return (
      <Link href={`/posts/${id}`} passHref>
        <article className={styles["post-container"]}>
          <RoundedBox className={styles["post"]}>
            <div className={styles["image-container"]}>
              <Image
                placeholder="blur"
                blurDataURL={imgUrl}
                className={styles["image"]}
                src={imgUrl}
                alt="post image"
                layout="fill"
                objectFit="cover"
              ></Image>
            </div>

            <div className={styles["info-area"]}>
              <h3 className={styles["title"]}>{title}</h3>
              <div>
                <p className={styles["subtitle"]}>{subtitle}</p>
              </div>
            </div>
          </RoundedBox>
        </article>
      </Link>
    );
}
