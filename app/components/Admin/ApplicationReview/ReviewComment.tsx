import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { dateTimeFormat } from "functions/formatDates";

interface Props {
  id: string;
  description: string;
  createdAt: string;
  createdBy: string;
  viewOnly: boolean;
  isResolved: boolean;
  onResolveToggle: (id: string, resolve: boolean) => void;
  onDelete: (id: string) => void;
}

export const ReviewComment: React.FunctionComponent<Props> = ({
  id,
  description,
  createdAt,
  createdBy,
  viewOnly,
  isResolved,
  onResolveToggle,
  onDelete,
}) => {
  return (
    <li>
      <div className="text-block">
        <p>{description}</p>
        <p className="timestamp">
          <span>{createdBy}</span>
          {`${dateTimeFormat(createdAt, "minutes")}`}
        </p>
      </div>
      {!viewOnly && (
        <div>
          <Button
            size="sm"
            variant="outline-primary"
            style={{ marginRight: "0.5em" }}
            onClick={() => onResolveToggle(id, !isResolved)}
          >
            {`${isResolved ? "Unresolve" : "Resolve"}`}
          </Button>
          <OverlayTrigger
            placement="top"
            overlay={(props) => (
              <Tooltip id="delete" {...props}>
                Delete comment
              </Tooltip>
            )}
          >
            <Button
              size="sm"
              aria-label="Delete"
              variant="secondary"
              onClick={() => onDelete(id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </OverlayTrigger>
        </div>
      )}
      <style jsx>{`
        li {
          list-style-type: none;
          padding: 0;
          margin-bottom: 1rem;
          width: 100%;
          display: inline-flex;
          justify-content: space-between;
        }
        li:last-of-type {
          margin: 0;
        }
        .text-block {
          max-width: calc(100% - 120px - 0.5rem);
        }
        .text-block ~ div {
          margin-left: 0.5rem;
        }
        p {
          margin-bottom: 0.5em;
          line-height: 1.2;
          font-size: 0.9rem;
        }
        .timestamp {
          font-size: 0.8rem;
          margin-bottom: 0;
          line-height: 1.5;
          color: #666;
        }
        .timestamp span {
          margin-right: 0.5em;
        }
      `}</style>
    </li>
  );
};

export default ReviewComment;
