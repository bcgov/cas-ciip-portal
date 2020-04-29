import React from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';

interface Props {
  title?: string | JSX.Element;
  helpMessage?: string | JSX.Element;
}

export const HelpComponent: React.FunctionComponent<Props> = (props) => {
  const popover = (
    <Popover className="ciip-help" id="popover-basic">
      <Popover.Title as="h3">{props.title}</Popover.Title>
      <Popover.Content>{props.helpMessage}</Popover.Content>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <div className="help-trigger-container">
          <span className="help-trigger">?</span>
        </div>
      </OverlayTrigger>
      <style jsx>
        {`
          .help-trigger-container {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #004085;
            width: 20px;
            height: 20px;
            border-radius: 20px;
            cursor: pointer;
            margin-left: 10px;
          }
          .help-trigger {
            display: inline-block;
            color: #004085;
          }
        `}
      </style>
    </>
  );
};

export default HelpComponent;
