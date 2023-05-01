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
import Link from "next/link";
import { getAttachmentDownloadRoute } from "routes";
import { getAttachmentDeleteRoute } from "routes";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const saveAttachment = async (e) => {
    try {
      setIsUploading(true);
      const { environment } = relay;
      const file = e.target.files[0];

      if (file.size > 5000000) {
        throw Error("Files must be smaller than 50MB");
      }

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
        messages: {
          failure:
            "There was an error uploading your file. Please check that it is a PDF smaller than 50MB",
        },
      };

      await createAttachmentMutation(environment, variables)
        .catch(() => {
          setIsUploading(false);
        })
        .then(() => setIsUploading(false));
    } catch (e) {
      setIsUploading(false);
      toast(e.message, {
        className: "toastalert-error",
        autoClose: false,
        position: "top-center",
        // Don't show duplicate errors if the same mutation fails several times in a row
        toastId: "verification-upload",
      });
    }
  };

  const deleteAttachment = async (id) => {
    const { environment } = relay;
    deleteAttachmentMutation(environment, {
      connections: [application.attachmentsByApplicationId.__id],
      input: {
        id,
      },
    });
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
              <div>
                Only PDF formats are accepted and file size must be smaller than
                50MB
              </div>
            </div>
          )}
        </Col>
        <Col
          xs={12}
          style={{
            margin: "20px 0 20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {application.attachmentsByApplicationId.edges.length > 0 && (
            <table className="bc-table">
              <tr>
                <th>File</th>
                <th>Created Date</th>
                <th>Version Number</th>
              </tr>
              {application.attachmentsByApplicationId.edges.map(({ node }) => {
                const doesFileBelongToLatestVersion =
                  node.versionNumber ===
                  application.latestDraftRevision.versionNumber;
                return (
                  <tr
                    className={
                      doesFileBelongToLatestVersion ? "latest-version" : ""
                    }
                  >
                    <td>
                      <Link href={getAttachmentDownloadRoute(node.id)} passHref>
                        {node.fileName}
                      </Link>{" "}
                      {doesFileBelongToLatestVersion && (
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() =>
                            router
                              .push(getAttachmentDeleteRoute(node.id))
                              .then(() => {
                                return deleteAttachment(node.id);
                              })
                          }
                        />
                      )}
                    </td>
                    <td>{dateTimeFormat(node.createdAt, "days_string")}</td>
                    <td>{node.versionNumber}</td>
                  </tr>
                );
              })}
            </table>
          )}
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
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        table.bc-table {
          margin-top: 1rem;
          border-collapse: separate;
          border-spacing: 0;

        }
        :global(table.bc-table td) {
          border-right: 1px solid #939393;
          border-bottom: 1px solid #939393;
          text-align: left;
          padding: 0.5rem;
        }

        :global(td:first-child) {
          border-left: 1px solid #939393;
        }
        th {
          position: relative;
          cursor: pointer;
          background-color: #003366;
          color: white;
          text-align: left;
          padding: 0.5rem;
          height: 4rem;
        }

        th:not(last-child) {
          border-right: 1px solid #ccc;
        }

        th:first-child {
          border-top-left-radius: 0.25rem;
          border-left: 1px solid #003366;
          border-top: 1px solid #003366;
          padding: 0.5rem;
        }

        th:last-child {
          border-top-right-radius: 0.25rem;
          border-right: 1px solid #003366;
          border-top: 1px solid #003366;
        }
        .latest-version {
          background-color: yellow;
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
            versionNumber
          }
        }
      }
    }
  `,
});
