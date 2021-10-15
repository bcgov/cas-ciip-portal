import {
  faCaretDown,
  faCaretUp,
  faCheck,
  faExclamation,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { createFragmentContainer, graphql } from "react-relay";
import { ApplicationReviewValidationContainer_applicationRevision } from "__generated__/ApplicationReviewValidationContainer_applicationRevision.graphql";

interface Props {
  applicationRevision: ApplicationReviewValidationContainer_applicationRevision;
}

export const ApplicationReviewValidation: React.FunctionComponent<Props> = ({
  applicationRevision,
}) => {
  const [expanded, setExpanded] = useState(false);

  const failedValidationItems = applicationRevision.validation.edges.filter(
    ({ node }) => !node.isOk
  );
  const passedValidationItems = applicationRevision.validation.edges.filter(
    ({ node }) => node.isOk
  );

  const failedValidationCount = failedValidationItems.length;
  const totalValidationCount = applicationRevision.validation.edges.length;
  const hasFailedValidations = failedValidationCount > 0;

  const validationVariant = hasFailedValidations ? "warning" : "info";
  const validationIcon = hasFailedValidations
    ? faExclamationTriangle
    : faInfoCircle;

  const listValidationsWithIcon = (validations, icon) => {
    if (validations.length === 0) return null;

    return (
      <ul>
        {validations.map(({ node }) => (
          <li key={node.validationDescription}>
            <FontAwesomeIcon icon={icon} fixedWidth className="mr-1" />
            {node.validationDescription}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Row className="mt-3">
      <Col>
        <ListGroup>
          <ListGroup.Item variant={validationVariant}>
            <Row>
              <Col>
                <FontAwesomeIcon icon={validationIcon} fixedWidth />
                &nbsp;
                {hasFailedValidations
                  ? `This application failed ${failedValidationCount} of ${totalValidationCount} validation checks.`
                  : `This application passed ${totalValidationCount} of ${totalValidationCount} validation checks.`}
              </Col>
            </Row>
            {expanded && (
              <>
                <Row className="mt-2">
                  <Col>
                    {listValidationsWithIcon(failedValidationItems, faTimes)}
                  </Col>
                </Row>
                {passedValidationItems.length > 0 && (
                  <>
                    <Row>
                      <Col>The following checks were passed:</Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        {listValidationsWithIcon(
                          passedValidationItems,
                          faCheck
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </>
            )}
          </ListGroup.Item>
          {applicationRevision.overrideJustification && (
            <ListGroup.Item variant="danger">
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faExclamation} fixedWidth />
                  &nbsp; The applicant chose to override some validation
                  failures.
                </Col>
              </Row>
              {expanded && (
                <>
                  <Row className="ml-3 mt-2">
                    <Col>
                      <b>Applicant justification:</b>
                    </Col>
                  </Row>
                  <Row className="ml-3">
                    <Col className="ml-4">
                      {applicationRevision.overrideJustification}
                    </Col>
                  </Row>
                </>
              )}
            </ListGroup.Item>
          )}
          <ListGroup.Item className="text-right p-0">
            <Button
              variant="link"
              className="pt-1 pb-1 pr-2"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Hide validation details"
                : "See all validation details"}
              <FontAwesomeIcon
                icon={expanded ? faCaretUp : faCaretDown}
                className="ml-2"
              />
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <style jsx>{`
        :global(li) {
          list-style-type: none;
        }
      `}</style>
    </Row>
  );
};

export default createFragmentContainer(ApplicationReviewValidation, {
  applicationRevision: graphql`
    fragment ApplicationReviewValidationContainer_applicationRevision on ApplicationRevision {
      overrideJustification
      validation {
        edges {
          node {
            validationDescription
            isOk
          }
        }
      }
    }
  `,
});
