import { GetStaticPropsContext } from 'next';
import React, { ReactElement } from 'react';
import CommitteeDisplay from '../../sheredComponents/CommitteeDisplay/CommitteeDisplay';
import { GetCommitteeDto, sendRequestToGetCommittees } from '../../utils/db/committees';
import styles from "./CommitteesPage.module.css";

export async function getStaticProps(context: GetStaticPropsContext) {
  const committees = await sendRequestToGetCommittees();

  return {
    props: { committees },
    revalidate: 10,
  };
}

interface Props {
    committees: GetCommitteeDto[];
}

export default function CommitteesPage({ committees }: Props): ReactElement {
    console.log(committees);
    return (
      <>
      {committees && <div className={styles['committees-container']}>
        {committees.map((committee) => (
            <CommitteeDisplay key={committee.id} committee={committee} />
        ))}
      </div>}
      </>
    );
}
