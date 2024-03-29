import React, { useState, useEffect } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import { Accordion, Alert, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import updateApplicationRevisionMutation from "mutations/application/updateApplicationRevisionMutation";
import LoadingOnClickButton from "components/helpers/LoadingOnClickButton";

interface Props {
  overrideActive: boolean;
  setOverrideActive: (boolean) => void;
  applicationOverrideJustification: string;
  revisionId: string;
  relay: RelayProp;
  hasErrors: boolean;
  applicationDetailsRendered: boolean;
}

export const ApplicationOverrideJustificationComponent: React.FunctionComponent<Props> = ({
  overrideActive,
  setOverrideActive,
  applicationOverrideJustification,
  revisionId,
  relay,
  hasErrors,
  applicationDetailsRendered,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [overrideJustification, setOverrideJustification] = useState(
    applicationOverrideJustification
  );
  const [emptyError, setEmptyError] = useState("");

  const handleOverrideChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverrideJustification(e.target.value);
  };

  const handleOverrideCancel = () => {
    setAccordionOpen(false);
    setEmptyError("");
    setOverrideActive(applicationOverrideJustification !== null);
    setOverrideJustification(applicationOverrideJustification || null);
  };

  const handleOverrideDelete = async () => {
    const { environment } = relay;
    const variables = {
      input: {
        id: revisionId,
        applicationRevisionPatch: {
          overrideJustification: null,
        },
      },
    };
    await updateApplicationRevisionMutation(environment, variables);
    setOverrideJustification(null);
    setOverrideActive(false);
  };

  const handleOverrideSave = async () => {
    if (overrideJustification) {
      setAccordionOpen(false);
      const { environment } = relay;
      const variables = {
        input: {
          id: revisionId,
          applicationRevisionPatch: {
            overrideJustification,
          },
        },
      };

      await updateApplicationRevisionMutation(environment, variables);
      setEmptyError("");
      setOverrideActive(true);
    } else setEmptyError("Justification cannot be empty");
  };

  const handleOverrideEdit = () => {
    setOverrideActive(false);
    setAccordionOpen(true);
  };

  useEffect(() => {
    if (overrideJustification && !hasErrors && applicationDetailsRendered)
      handleOverrideDelete();
  });

  const errorsWithOverrideActive = (
    <>
      <Alert variant="danger">
        <strong>Error Validation Override Active</strong>
      </Alert>
      <Alert variant="secondary">
        <p>
          <strong>
            You have chosen to override the errors present in your application.
            This may cause a delay in processing your application.
          </strong>
        </p>
        <p>
          <strong>Your Override Justification:</strong>
        </p>
        <p>{overrideJustification}</p>
        <Button
          style={{ marginRight: "5px" }}
          variant="secondary"
          onClick={handleOverrideEdit}
        >
          Edit Justification
        </Button>
        <LoadingOnClickButton
          variant="danger"
          onClick={handleOverrideDelete}
          loadingText="Deleting Override..."
        >
          Delete Override
        </LoadingOnClickButton>
      </Alert>
    </>
  );

  const errorsWithoutOverrideActive = (
    <>
      <Alert variant="danger">
        <Accordion>
          <p>
            <strong>Your application contains errors</strong>
          </p>
          <div className="override-accordion">
            Please correct the errors shown below before submitting.
            Alternatively, you may provide justification to override this and
            submit without corrections. Your justification will be reviewed by
            CAS and may cause a delay in processing your application.
            <Accordion.Toggle
              as={Button}
              variant="secondary"
              eventKey="0"
              onClick={() => setAccordionOpen(!accordionOpen)}
            >
              Override and Justify
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ marginLeft: "0.75em" }}
              />
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse in={accordionOpen} eventKey="0">
            <>
              <Form>
                <h4>Override Form Validation</h4>
                <Form.Group controlId="overrideJustification">
                  <Form.Label>Justification for incomplete form:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={overrideJustification || ""}
                    onChange={handleOverrideChange}
                  />
                </Form.Group>
                <LoadingOnClickButton
                  variant="success"
                  onClick={handleOverrideSave}
                  loadingText="Saving..."
                >
                  Save
                </LoadingOnClickButton>
                <Accordion.Toggle
                  as={Button}
                  eventKey="0"
                  variant="light"
                  style={{
                    marginLeft: "1em",
                    border: "1px solid currentColor",
                  }}
                  onClick={handleOverrideCancel}
                >
                  Cancel
                </Accordion.Toggle>
              </Form>
              {!overrideJustification && (
                <p className="justification-text">{emptyError}</p>
              )}
            </>
          </Accordion.Collapse>
        </Accordion>
      </Alert>
      <style jsx>
        {`
          .override-accordion {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          .justification-text {
            color: red;
          }
        `}
      </style>
    </>
  );

  const renderOverride = () => {
    if (!applicationDetailsRendered) return null;
    if (!hasErrors) return null;
    if (hasErrors && overrideActive) return errorsWithOverrideActive;
    return errorsWithoutOverrideActive;
  };

  return renderOverride();
};

export default createFragmentContainer(
  ApplicationOverrideJustificationComponent,
  {}
);
