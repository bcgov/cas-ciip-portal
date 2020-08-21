import React from 'react';
import {faSync, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Props {
  isSaved?: boolean;
}

const SavingIndicator: React.FunctionComponent<Props> = ({isSaved}) => {
  return (
    <div className="text-secondary">
      <FontAwesomeIcon icon={isSaved ? faCheck : faSync} />
      <span>{isSaved ? 'Form input saved' : 'Saving form input...'}</span>
      <style jsx>
        {`
          div {
            width: 100%;
            display: inline-flex;
            justify-content: flex-end;
            align-items: baseline;
            color: ;
          }

          span {
            margin-left: 0.3em;
          }
        `}
      </style>
    </div>
  );
};

export default SavingIndicator;
