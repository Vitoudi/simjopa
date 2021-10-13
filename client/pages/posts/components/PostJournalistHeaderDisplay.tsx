import React, { ReactElement, useEffect, useState } from 'react'
import { getJournalistById, GetJournalistDto, getJournalistImgPath, PostJournalistDto } from '../../../utils/db/journalists'
import Highlight from "../../../sheredComponents/Highlight/Highlight"
import Image from "next/image";
import Link from "next/link";
import RoundImage from "../../../sheredComponents/RoundImage/RoundImage"
import { getUserImageFullPath } from '../../../utils/db/images';

interface Props {
    journalistId: number
}

export default function PostJournalistHeaderDisplay({ journalistId }: Props): ReactElement | null {
    const [journalist, setJournalist] = useState<GetJournalistDto | null>(null);

    async function makeJournalistRequest() {
        const journalist = await getJournalistById(journalistId);
        setJournalist(journalist);
    }

    useEffect(() => {
        makeJournalistRequest();
    }, []);

    if (!journalist) return null;

    const imgUrl = getUserImageFullPath(journalist.imgRef || undefined);

    return (
      <Link replace={true} href={`/journalist/${journalist.id}`} passHref>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            alignItems: "center"
          }}
        >
          <Highlight>Por: </Highlight>
          {journalist.name}
          <RoundImage src={imgUrl} alt="journalist image"/>
        </div>
      </Link>
    );
}
