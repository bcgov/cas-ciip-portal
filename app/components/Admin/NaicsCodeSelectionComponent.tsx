import Link from 'next/link';
import {useRouter} from 'next/router';
import React from 'react';
import {ListGroup} from 'react-bootstrap';

interface Props {
  naicsCodes: {code: string; description: string; id: string}[];
}

export const NaicsCodeSelectionComponent: React.FunctionComponent<Props> = ({
  naicsCodes
}) => {
  const router = useRouter();

  return (
    <ListGroup variant="flush">
      {naicsCodes.map(({code, description, id}) => (
        <Link
          key={id}
          prefetch={false}
          href={{
            pathname: router.pathname,
            query: {
              ...router.query,
              naicsCodeId: id
            }
          }}
        >
          <ListGroup.Item action active={router.query?.naicsCodeId === id}>
            {/* <table>
              <tbody>
                <tr>
                  <td>{code}</td>
                  <td style={{paddingLeft: '1em'}}>{description}</td>
                </tr>
              </tbody>
            </table> */}
            {description}
            <br />
            <b>{code}</b>
          </ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
};
