import React, {useState, useEffect} from 'react';
import {Survey} from 'survey-react';

const SurveyWrapper = props => {
  // Since the survey-react component does not handle receiving a new model,
  // we have to resort to this dirty hack, to unmount and mount it again, so that
  // it gets initialized properly when the model changes
  const [timeoutLock, setTimeoutLock] = useState(null);
  const {model} = props;
  useEffect(() => {
    if (timeoutLock !== null) clearTimeout(timeoutLock);
    setTimeoutLock(
      setTimeout(() => {
        setTimeoutLock(null);
      }, 1)
    );
  }, [model]); // eslint-disable-line react-hooks/exhaustive-deps
  // we don't want to run this effect when the timeoutLock changes, otherwise we'll
  // never render

  if (timeoutLock !== null || !model) {
    // TODO: loading spinner
    return null;
  }

  Survey.cssType = 'bootstrap';
  return (
    <div id="surveyContainer">
      <Survey {...props} />
      <style jsx global>
        {`
          #surveyContainer {
            border: 1px solid #dcdcdcf2;
            border-radius: 4px;
            box-shadow: 0px 7px 9px 0px #00000026;
            padding: 20px;
          }
          .card-footer :global {
            background: white !important;
            display: none;
          }
          .panel-footer {
            background: white;
            text-align: right;
          }
          .panel-footer .btn.sv_complete_btn {
            background: #036;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default SurveyWrapper;
