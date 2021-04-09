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
    <>
      <div className="scrollable" tabIndex={0}>
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
                {description}
                <br />
                <b>{code}</b>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </div>
      <style jsx global>
        {`
          .list-group-item.active {
            background-color: #38598a;
            color: white;
          }
        `}
      </style>
      <style jsx>
        {`{

          .scrollable {
            overflow-y: scroll;
            max-height: calc(100vh - 180px);
          }
          .scrollable::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
          }
          .scrollable::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
    </>
  );
};
