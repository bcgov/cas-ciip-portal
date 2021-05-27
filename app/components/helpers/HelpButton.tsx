import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import getConfig from 'next/config';
import {
  faQuestion,
  faComments,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isInternalUser?: boolean;
}

const HelpButton: React.FunctionComponent<Props> = ({
  isInternalUser = true
}) => {
  const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
  const mailToUrl = supportEmail
    ? `mailto:${supportEmail}?subject=Internal Support Request`
    : '#';
  const docsUrl = isInternalUser
    ? 'https://github.com/bcgov/cas-ciip-portal/blob/master/docs/admin-analyst-guide.md'
    : 'https://github.com/bcgov/cas-ciip-portal/blob/master/docs/reporting-guide.md';

  const [isOpened, setIsOpened] = useState(false);
  const toggleHelpBubble = () => {
    setIsOpened((current) => !current);
  };
  const helpIcon = (
    <>
      <FontAwesomeIcon
        icon={faComments}
        color="white"
        style={{height: '2.2em', width: '2.5em'}}
      />
      <FontAwesomeIcon
        icon={faQuestion}
        size="sm"
        style={{position: 'absolute', top: '29%', left: '33%'}}
      />
    </>
  );
  const closeIcon = <FontAwesomeIcon icon={faTimes} color="white" size="lg" />;

  const option1 = isInternalUser ? (
    <a href={mailToUrl}>Need to report a problem to the development team?</a>
  ) : (
    <a href={docsUrl} target="_blank" rel="noopener noreferrer">
      See the help documentation
    </a>
  );

  const option2 = isInternalUser ? (
    <a href={docsUrl} target="_blank" rel="noopener noreferrer">
      Looking for help documentation?
    </a>
  ) : (
    <Link href="/resources/contact">
      <a target="_blank" rel="noopener noreferrer">
        Contact us to request specific assistance
      </a>
    </Link>
  );
  return (
    <>
      {isOpened && (
        <div id="help-bubble">
          <ul>
            <li>
              <span role="img" aria-hidden="true">
                {isInternalUser ? '👋' : '📖'}
              </span>
              {option1}
            </li>
            <li>OR</li>
            <li>
              <span role="img" aria-hidden="true">
                {isInternalUser ? '📖' : '✉️'}
              </span>
              {option2}
            </li>
          </ul>

          <span className="triangle">◥</span>
        </div>
      )}
      <button
        id="help-button"
        type="button"
        aria-label="Click for help options"
        onClick={toggleHelpBubble}
      >
        {isOpened ? closeIcon : helpIcon}
      </button>
      <style jsx>{`
        #help-button {
          height: 65px;
          width: 65px;
          position: fixed;
          bottom: 16px;
          right: 16px;
          border: none;
          outline: none;
          border-radius: 50%;
          background: #0060ff;
          color: #0060ff;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
            0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
          z-index: 999;
        }
        #help-button:focus,
        #help-button:active {
          background: #003899;
          color: #003899;
          box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12),
            0 5px 5px -3px rgba(0, 0, 0, 0.4);
        }
        #help-bubble {
          position: fixed;
          right: 70px;
          bottom: 94px;
          padding: 1.4em;
          background: #fff;
          max-width: 310px;
          min-height: 80px;
          border-radius: 4px;
          box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
            0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
          z-index: 999;
        }
        #help-bubble > ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: flex;
        }
        li:nth-of-type(2) {
          justify-content: center;
          font-weight: bold;
          padding: 0.5em;
        }
        #help-bubble .triangle {
          color: #fff;
          font-size: 18px;
          text-shadow: 0 4px 4px rgb(0 0 0 / 40%);
          position: absolute;
          bottom: -20px;
          right: 0;
        }
        span[role='img'] {
          margin-right: 0.5em;
        }
      `}</style>
    </>
  );
};

export default HelpButton;
