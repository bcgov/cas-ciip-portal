import { FilePicker } from "@button-inc/bcgov-theme";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "components/LoadingSpinner";
import { dateTimeFormat } from "functions/formatDates";
import createAttachmentMutation from "mutations/application/createAttachmentMutation";
import deleteAttachmentMutation from "mutations/application/deleteAttachment";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import { VerificationStatement_application } from "__generated__/VerificationStatement_application.graphql";

function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / k ** i).toFixed(dm)) + " " + sizes[i];
}

interface Props {
  application: VerificationStatement_application;
  relay: RelayProp;
  onError: () => void;
}
export const VerificationStatementComponent: React.FunctionComponent<Props> = ({
  application,
  relay,
  onError,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const saveAttachment = async (e) => {
    setIsUploading(true);
    const { environment } = relay;
    const file = e.target.files[0];
    const variables = {
      connections: [application.attachmentsByApplicationId.__id],
      input: {
        attachment: {
          file,
          fileName: file.name,
          fileSize: formatBytes(file.size),
          fileType: file.type,
          applicationId: application.rowId,
          versionNumber: application.latestDraftRevision.versionNumber,
        },
      },
    };

    await createAttachmentMutation(environment, variables)
      .catch(() => {
        setIsUploading(false);
      })
      .then(() => setIsUploading(false));
  };

  return (
    <div className="card">
      <div className="card-header">
        <Row>
          <Col md={8}>
            <h1>Verification Statement</h1>
          </Col>
        </Row>
      </div>
      <Row style={{ padding: "0 2em 2em 2em" }}>
        <Col xs={12} style={{ margin: "20px 0 20px" }}>
          {isUploading ? (
            <div>
              <div className="loadingSpinnerContainer">
                <LoadingSpinner />
                <span>Uploading file...</span>
              </div>
            </div>
          ) : (
            <div className="upload-button-container">
              <FilePicker
                onChange={saveAttachment}
                onError={onError}
                name="upload-attachment"
              >
                Upload New Attachment
              </FilePicker>
            </div>
          )}
        </Col>
        <Col xs={12} style={{ margin: "20px 0 20px" }}>
          {application.attachmentsByApplicationId.edges.map(({ node }) => {
            return (
              <>
                <a href="#" className="attachment-link" key={node.id}>
                  {node.fileName}
                </a>{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    const { environment } = relay;
                    return deleteAttachmentMutation(environment, {
                      connections: [
                        application.attachmentsByApplicationId.__id,
                      ],
                      input: {
                        id: node.id,
                      },
                    });
                  }}
                />
                <div className="uploaded-on">
                  Uploaded on {dateTimeFormat(node.createdAt, "days_string")}
                </div>
              </>
            );
          })}
        </Col>
      </Row>
      <style jsx>{`
        .card {
          border-color: #a4a4a4;
          background-color: #f4f4f4;
        }
        .card-header {
          background-color: #036;
          color: #fff;
        }
        .card-header h1 {
          margin-bottom: 0;
          font-size: 30px;
          display: inline-block;
        }
        .upload-button-container {
          margin top: 2em;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .attachment-link {
          font-size: 1.25em;
        }
        .uploaded-on {
          font-style: italic;
          font-size: 1.25em;
        }

      `}</style>
    </div>
  );
};

export default createFragmentContainer(VerificationStatementComponent, {
  application: graphql`
    fragment VerificationStatement_application on Application {
      rowId
      latestDraftRevision {
        versionNumber
      }
      attachmentsByApplicationId(first: 2000000000)
        @connection(
          key: "VerificationStatement_attachmentsByApplicationId"
          filters: []
        ) {
        __id
        edges {
          node {
            fileName
            id
            rowId
            createdAt
          }
        }
      }
    }
  `,
});
