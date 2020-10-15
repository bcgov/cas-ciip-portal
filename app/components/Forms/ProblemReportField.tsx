import React, {useState} from 'react';
import {FieldProps} from 'react-jsonschema-form';
import {Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
const ProblemReportField: React.FunctionComponent<FieldProps<string>> = (
  props
) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.formData);
  const title = props.formData ? 'Edit Reported Problem' : 'Report a Problem';
  const titleIcon = props.formData ? faExclamationCircle : faQuestionCircle;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setValue(props.formData);
    setExpanded(false);
  };

  const handleSave = () => {
    props.onChange(value);
    setExpanded(false);
  };

  return (
    <>
      <style jsx>{`
        .title,
        .report-field .controls {
          display: flex;
          width: 100%;
          justify-content: flex-end;
          align-items: center;
        }

        .report-field .controls {
          margin-top: 16px;
        }

        .report-field {
          background-color: #fcf8e2;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 16px;
          margin-top: 16px;
        }
      `}</style>
      <span className="title">
        <Button variant="link" onClick={() => setExpanded(true)}>
          <FontAwesomeIcon icon={titleIcon} />
          &nbsp;
          {title}
        </Button>
      </span>
      {expanded && (
        <div className="report-field">
          <p>
            Please leave a detailed message below explaining any issues
            encountered on this page.
            <br />
            This message will be sent with your application when it is
            submitted.
            <br />A representative from the Climate Action Secretariat may
            contact you for further clarification.
          </p>
          <Form.Control
            as="textarea"
            rows={8}
            value={value}
            onChange={handleChange}
          />
          <div className="controls">
            <Button variant="outline-dark" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              style={{marginLeft: 16}}
              variant="success"
              onClick={handleSave}
            >
              Save Note
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemReportField;
