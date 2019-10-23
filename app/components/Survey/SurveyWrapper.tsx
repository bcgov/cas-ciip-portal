import React, {useState, useEffect} from 'react';
import {Survey, Model} from 'survey-react';

const SurveyWrapper = ({
  formJson,
  initialData,
  onComplete,
  editable = true
}) => {
  const createModel = () => {
    if (!formJson) return null;
    const m = new Model(formJson);
    m.checkErrorsMode = 'onValueChanged';
    if (initialData) {
      m.data = initialData;
      m.clearIncorrectValues();
    }

    m.mode = editable === false ? 'display' : 'edit';
    return m;
  };

  // Since the survey-react component does not handle receiving a new model,
  // we have to resort to this dirty hack, to unmount and mount it again, so that
  // it gets initialized properly when the model changes
  // The oldModel is used to prevent flickering when we're changing the form model
  const [timeoutLock, setTimeoutLock] = useState(null);
  const [oldModel, setOldModel] = useState(null);
  const [model, setModel] = useState(createModel());
  useEffect(() => {
    if (timeoutLock !== null) clearTimeout(timeoutLock);
    setOldModel(model);
    setModel(null);
    setTimeoutLock(
      setTimeout(() => {
        setModel(createModel());
        setOldModel(null);
        setTimeoutLock(null);
      }, 1)
    );
  }, [formJson, editable]); // eslint-disable-line react-hooks/exhaustive-deps
  // we don't want to run this effect when the timeoutLock changes, otherwise we'll
  // never render

  if (!model && !oldModel) {
    return null;
  }

  Survey.cssType = 'bootstrap';
  return (
    <div id="surveyContainer">
      {oldModel && <Survey model={oldModel} />}
      {model && <Survey model={model} onComplete={onComplete} />}
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
