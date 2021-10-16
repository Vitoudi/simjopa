import React, { ReactElement, useEffect } from 'react'
import { GetJournalistDto } from '../../utils/db/journalists'
import { getUserImageFullPath } from '../../utils/db/images';
import SmallDisplay from '../SmallDisplay/SmallDisplay';

interface Props {
    journalist: GetJournalistDto;
}

export default function JournalistDisplay({ journalist }: Props): ReactElement {
    const { imgRef, name, id } = journalist;
    const imgPath = getUserImageFullPath(imgRef || undefined);

    useEffect(() => console.log(imgPath), [imgPath]);

    return (
      <SmallDisplay href={`/journalist/${id}`} text={name} imgPath={imgPath || ""} />
    );
}
