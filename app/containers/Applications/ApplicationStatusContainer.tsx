import React, {useEffect} from 'react';
import {graphql, createRefetchContainer} from 'react-relay';
import updateApplicationStatusByRowIdMutation from '../../mutations/application/updateApplicationStatusByRowIdMutation';
import ApplicationStatusItemContainer from './ApplicationStatusItemContainer';

export const ApplicationStatus = props => {
  const {allApplicationStatuses} = props.query;
  useEffect(() => {
    const refetchVariables = {
      condition: {
        applicationId: Number(props.applicationId),
        applicationStatus:
          allApplicationStatuses.edges[0].node.applicationStatus
      }
    };
    props.relay.refetch(refetchVariables);
  });

  // Save Application status to database
  const setApplicationStatus = (eventKey, event) => {
    event.preventDefault();
    event.stopPropagation();
    event.persist();

    const date = new Date().toUTCString();

    const variables = {
      input: {
        rowId: Number(props.applicationId),
        applicationStatusPatch: {
          applicationStatus: eventKey,
          updatedAt: date,
          updatedBy: 'Admin'
        }
      }
    };

    updateApplicationStatusByRowIdMutation(props.relay.environment, variables);
  };

  return allApplicationStatuses.edges.length === 1 ? (
    <ApplicationStatusItemContainer
      key={allApplicationStatuses.edges[0].node.id}
      applicationStatus={allApplicationStatuses.edges[0].node}
      setApplicationStatus={setApplicationStatus}
    />
  ) : null;
};

export default createRefetchContainer(
  ApplicationStatus,
  {
    query: graphql`
      fragment ApplicationStatusContainer_query on Query
        @argumentDefinitions(condition: {type: "ApplicationStatusCondition"}) {
        allApplicationStatuses(condition: $condition) {
          edges {
            node {
              id
              ...ApplicationStatusItemContainer_applicationStatus
            }
          }
        }
      }
    `
  },
  graphql`
    query ApplicationStatusContainerRefetchQuery(
      $condition: ApplicationStatusCondition
    ) {
      query {
        ...ApplicationStatusContainer_query @arguments(condition: $condition)
      }
    }
  `
);
