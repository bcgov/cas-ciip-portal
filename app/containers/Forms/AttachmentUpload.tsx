import { FilePicker } from "@button-inc/bcgov-theme";
import LoadingSpinner from "components/LoadingSpinner";
import React from "react";
import { createFragmentContainer, graphql, RelayProp } from "react-relay";
import createAttachmentMutation from "mutations/application/createAttachmentMutation";
import { SubmitApplication_applicationRevision } from "__generated__/SubmitApplication_applicationRevision.graphql";
import { Row, Col } from "react-bootstrap";
import deleteAttachmentMutation from "mutations/application/deleteAttachment";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NodeNextRequest } from "next/dist/server/base-http/node";

function formatBytes(bytes: number, decimals = 2) {
  if (bytes <= 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

interface Props {
  application: any;
  relay: RelayProp;
}
export const AttachmentUploadComponent: React.FunctionComponent<Props> = ({
  application,
  relay,
}) => {
  const { environment } = relay;
  const saveAttachment = async (e) => {
    const file = e.target.files[0];
    const variables = {
      input: {
        attachment: {
          file: file,
          fileName: file.name,
          fileSize: formatBytes(file.size),
          fileType: file.type,
          applicationId: application.rowId,
        },
      },
    };

    await createAttachmentMutation(environment, variables);
  };

  const isCreatingAttachment = false; // brianna

  console.log("application", application);

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
          {isCreatingAttachment ? (
            <div>
              <div className="loadingSpinnerContainer">
                <LoadingSpinner></LoadingSpinner>
                <span>Uploading file...</span>
              </div>
            </div>
          ) : (
            <div className="upload-button-container">
              <FilePicker onChange={saveAttachment} name={"upload-attachment"}>
                Upload New Attachment
              </FilePicker>
            </div>
          )}
        </Col>
        <Col xs={12} style={{ margin: "20px 0 20px" }}>
          {application.attachmentsByApplicationId.edges.map(({ node }) => {
            console.log("node", node);
            return (
              <>
                {/* brianna not showing up, optimistic response? */}
                <a href="#" className="attachment-link">
                  {node.fileName} node.id={node.id}
                </a>{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    deleteAttachmentMutation(environment, {
                      input: {
                        id: node.id,
                      },
                    });
                  }}
                />
                <div className="uploaded-on">Uploaded on</div>
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

export default createFragmentContainer(AttachmentUploadComponent, {
  application: graphql`
    fragment AttachmentUpload_application on Application {
      rowId
      attachmentsByApplicationId {
        edges {
          node {
            fileName
            id
            rowId
          }
        }
      }
    }
  `,
});
