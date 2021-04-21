import React, {useState} from 'react';
import {FieldProps} from '@rjsf/core';
import {Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import {toast} from 'react-toastify';

const AddCommentField: React.FunctionComponent<FieldProps<string>> = (
  props
) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(props.formData);
  const title = props.formData ? 'Edit comment' : 'Add a comment';

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
    toast.success(
      'Your comment was saved for review upon application submission',
      {
        autoClose: 5000,
        position: 'top-center'
      }
    );
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
          <FontAwesomeIcon icon={faCommentAlt} />
          &nbsp;
          {title}
        </Button>
      </span>
      {expanded && (
        <div className="report-field">
          <legend>CIIP Application Comment</legend>

          <p>
            This area is only for leaving a comment regarding the data that you
            reported on this page. This comment will be visible by the person
            reviewing this CIIP application once the application is submitted.
          </p>
          <p>
            For any technical issue, or to review documentation, please click on
            the help bubble in the bottom right of your screen.
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
              Save Comment
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCommentField;
