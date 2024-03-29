import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  Card,
  Collapse,
} from "react-bootstrap";
import DropdownMenuItemComponent from "components/DropdownMenuItemComponent";
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay";
import { ApplicationDetailsContainer_query } from "ApplicationDetailsContainer_query.graphql";
import { ApplicationDetailsContainer_applicationRevision } from "ApplicationDetailsContainer_applicationRevision.graphql";
import { ApplicationDetailsContainer_diffQuery } from "ApplicationDetailsContainer_diffQuery.graphql";
import Link from "next/link";
import { getAttachmentDownloadRoute } from "routes";
import ApplicationDetailsCardItem from "./ApplicationDetailsCardItem";
import { dateTimeFormat } from "functions/formatDates";

/*
 * The ApplicationDetails renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationDetailsContainer_query;
  diffQuery?: ApplicationDetailsContainer_diffQuery;
  applicationRevision: ApplicationDetailsContainer_applicationRevision;
  relay: RelayRefetchProp;
  review: boolean;
  // Boolean indicates whether or not this item is being rendered by the summary component & should be liveValidated
  liveValidate: boolean;
  setApplicationDetailsRendered?: (boolean) => void;
}

export const ApplicationDetailsComponent: React.FunctionComponent<Props> = ({
  query,
  diffQuery,
  applicationRevision,
  relay,
  review,
  liveValidate,
  setApplicationDetailsRendered,
}) => {
  const { applicationByApplicationId: application } = applicationRevision;
  const formResults = applicationRevision.orderedFormResults.edges;
  const diffFromResults = review
    ? diffQuery?.old?.orderedFormResults?.edges
    : undefined;
  const attachments =
    applicationRevision?.applicationByApplicationId?.attachmentsByApplicationId
      .edges;

  const [oldDiffVersion, setOldDiffVersion] = useState(
    (
      applicationRevision.orderedFormResults.edges[0].node.versionNumber - 1
    ).toString()
  );
  const [newDiffVersion, setNewDiffVersion] = useState(
    applicationRevision.orderedFormResults.edges[0].node.versionNumber.toString()
  );
  const [showDiff, setShowDiff] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const refetchVariables = {
      oldVersion: oldDiffVersion,
      newVersion: newDiffVersion,
      applicationId: application.id,
    };
    relay.refetch(refetchVariables);
  }, [oldDiffVersion, newDiffVersion, applicationRevision, relay]);

  if (setApplicationDetailsRendered) setApplicationDetailsRendered(true);
  return (
    <>
      <Row>
        <Col>
          {diffFromResults ? (
            <Form.Check
              id="toggle-diff"
              label="Compare data between versions"
              checked={showDiff}
              type="checkbox"
              onChange={() => setShowDiff(!showDiff)}
            />
          ) : null}
        </Col>
        {showDiff ? (
          <>
            <Col md={2}>
              <Dropdown style={{ width: "100%", textTransform: "capitalize" }}>
                <Dropdown.Toggle
                  style={{ width: "100%", textTransform: "capitalize" }}
                  id="dropdown-old"
                >
                  {oldDiffVersion === "0"
                    ? "swrs import"
                    : "Version ".concat(oldDiffVersion)}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {application.applicationRevisionsByApplicationId.edges.map(
                    ({ node }, index) =>
                      index >= Number(newDiffVersion) ||
                      index === Number(oldDiffVersion) ? null : (
                        <DropdownMenuItemComponent
                          key={node.id}
                          itemEventKey={node.versionNumber}
                          itemFunc={setOldDiffVersion}
                          itemTitle={
                            node.versionNumber === 0
                              ? "swrs import"
                              : node.versionNumber
                          }
                        />
                      )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={1}>&nbsp;------&gt;</Col>
            <Col md={2}>
              <Dropdown style={{ width: "100%", textTransform: "capitalize" }}>
                <Dropdown.Toggle
                  style={{ width: "100%", textTransform: "capitalize" }}
                  id="dropdown-new"
                >
                  {Number(newDiffVersion) ===
                  application.latestSubmittedRevision.versionNumber
                    ? `current (V${newDiffVersion})`
                    : "Version ".concat(newDiffVersion)}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%" }}>
                  {application.applicationRevisionsByApplicationId.edges.map(
                    ({ node }, index) =>
                      index <= Number(oldDiffVersion) ? null : (
                        <DropdownMenuItemComponent
                          key={node.id}
                          itemEventKey={node.versionNumber}
                          itemFunc={setNewDiffVersion}
                          itemTitle={
                            node.versionNumber ===
                            application.latestSubmittedRevision.versionNumber
                              ? `current (V${node.versionNumber})`
                              : node.versionNumber
                          }
                        />
                      )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </>
        ) : null}
      </Row>
      <br />

      <div>
        {formResults.map(({ node }) => (
          <ApplicationDetailsCardItem
            key={node.id}
            liveValidate={liveValidate}
            diffFromResults={diffFromResults}
            diffToResults={diffQuery?.new?.orderedFormResults.edges}
            formResult={node}
            query={query}
            showDiff={showDiff}
          />
        ))}
      </div>
      <Card
        style={{ width: "100%", marginBottom: "10px" }}
        className="verification-statement-summary-card"
      >
        <Card.Header className="summary-form-header">
          <Row>
            <Col md={6}>
              <h2>Verification Statement </h2>
            </Col>
            <Col md={1} style={{ textAlign: "right" }}>
              <Button
                aria-label="toggle-card-open"
                title="expand or collapse the card"
                variant="outline-dark"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "+" : "-"}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Collapse in={!isOpen}>
          <Card.Body className="card-body">
            {attachments?.length > 0 ? (
              attachments.map(({ node }) => (
                <>
                  <div className="attachment-link" key={node.id}>
                    <Link href={getAttachmentDownloadRoute(node.id)} passHref>
                      {node.fileName}
                    </Link>
                  </div>
                  <div className="uploaded-on">
                    Uploaded on {dateTimeFormat(node.createdAt, "days_string")}
                  </div>
                </>
              ))
            ) : (
              <div>
                {" "}
                No verification statement was uploaded by the applicant.{" "}
              </div>
            )}
          </Card.Body>
        </Collapse>
      </Card>
      <style jsx global>{`
        h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
          line-height: 1.2;
        }
        .card-body {
          padding: 1.25rem;
        }
        .attachment-link {
          font-size: 1.25em;
        }
        .uploaded-on {
          font-style: italic;
          font-size: 1.25em;
        }
        @media print {
          header .header-right,
          #navbar,
          footer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default createRefetchContainer(
  ApplicationDetailsComponent,
  {
    query: graphql`
      fragment ApplicationDetailsContainer_query on Query {
        ...ApplicationDetailsCardItem_query
      }
    `,
    diffQuery: graphql`
      fragment ApplicationDetailsContainer_diffQuery on Query
      @argumentDefinitions(
        applicationId: { type: "ID!" }
        newVersion: { type: "String" }
        oldVersion: { type: "String" }
      ) {
        old: application(id: $applicationId) {
          orderedFormResults(versionNumberInput: $oldVersion) {
            edges {
              node {
                id
                versionNumber
                formJsonByFormId {
                  slug
                }
                formResult
              }
            }
          }
        }
        new: application(id: $applicationId) {
          orderedFormResults(versionNumberInput: $newVersion) {
            edges {
              node {
                id
                versionNumber
                formJsonByFormId {
                  slug
                }
                formResult
              }
            }
          }
        }
      }
    `,
    applicationRevision: graphql`
      fragment ApplicationDetailsContainer_applicationRevision on ApplicationRevision {
        versionNumber
        orderedFormResults {
          edges {
            node {
              id
              versionNumber
              ...ApplicationDetailsCardItem_formResult
            }
          }
        }
        applicationByApplicationId {
          id
          attachmentsByApplicationId {
            edges {
              node {
                id
                file
                fileName
                fileSize
                createdAt
              }
            }
          }
          latestSubmittedRevision {
            versionNumber
          }
          applicationRevisionsByApplicationId {
            edges {
              node {
                id
                versionNumber
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query ApplicationDetailsContainerRefetchQuery(
      $oldVersion: String
      $newVersion: String
      $applicationId: ID!
    ) {
      query {
        ...ApplicationDetailsContainer_diffQuery
          @arguments(
            oldVersion: $oldVersion
            newVersion: $newVersion
            applicationId: $applicationId
          )
      }
    }
  `
);
