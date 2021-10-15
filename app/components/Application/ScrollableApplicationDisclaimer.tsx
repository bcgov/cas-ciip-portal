import React from "react";
import { Card } from "react-bootstrap";
import LegalDisclaimerText from "components/LegalDisclaimerText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ScrollableApplicationDisclaimer: React.FunctionComponent = () => {
  return (
    <>
      <Card.Body>
        <Card.Title className="blue">
          CIIP Application Disclaimer
          <small>
            <a href="/resources/application-disclaimer" target="_blank">
              (<FontAwesomeIcon icon={faExternalLinkAlt} />
              expand)
            </a>
          </small>
        </Card.Title>
        <Card>
          <div tabIndex={0} id="disclaimer-text" className="show-scrollbar">
            <Card.Body>
              <LegalDisclaimerText />
            </Card.Body>
          </div>
        </Card>
      </Card.Body>
      <style jsx>{`
        #disclaimer-text {
          max-height: 19.2em;
          background: #eee;
          overflow-y: scroll;
        }
        .show-scrollbar::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 8px;
        }
        .show-scrollbar::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
        small {
          margin-left: 0.5em;
        }
      `}</style>
    </>
  );
};

export default ScrollableApplicationDisclaimer;
