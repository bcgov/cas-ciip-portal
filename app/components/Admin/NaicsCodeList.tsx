import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import {ListGroup} from 'react-bootstrap';

interface Props {
  naicsCodes: {code: string; description: string; id: string}[];
}

export const NaicsCodeList: React.FunctionComponent<Props> = ({naicsCodes}) => {
  const router = useRouter();

  return (
    <ListGroup variant="flush">
      {naicsCodes.map(({code, description, id}) => (
        <Link
          key={id}
          prefetch={false}
          href={{pathname: router.pathname, query: {naicsCodeId: id}}}
        >
          <ListGroup.Item active={router.query?.naicsCodeId === id}>
            <b>{code}</b>
            <br />
            <small>{description}</small>
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
};
