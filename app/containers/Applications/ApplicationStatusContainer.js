import React, {useEffect} from 'react';
import {graphql, commitMutation, createRefetchContainer} from 'react-relay';
import ApplicationStatusItemContainer from './ApplicationStatusItemContainer';

const setStatus = graphql`
  mutation ApplicationStatusContainerMutation(
    $input: UpdateApplicationStatusByRowIdInput!
  ) {
    updateApplicationStatusByRowId(input: $input) {
      applicationStatus {
        applicationId
        applicationStatus
      }
    }
  }
`;

const ApplicationStatusContainer = props => {
  console.log(props);
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
    const saveVariables = {
      input: {
        rowId: Number(props.applicationId),
        applicationStatusPatch: {
          applicationStatus: eventKey,
          updatedAt: date,
          updatedBy: 'Admin'
        }
      }
    };
    const {environment} = props.relay;
    const saveMutation = setStatus;
    commitMutation(environment, {
      mutation: saveMutation,
      variables: saveVariables,
      onCompleted: response => {
        console.log(response);
      },
      onError: err => console.error(err)
    });
  };

  return (
    <>
      {allApplicationStatuses.edges.length === 1 ? (
        <ApplicationStatusItemContainer
          key={allApplicationStatuses.edges[0].node.id}
          applicationStatus={allApplicationStatuses.edges[0].node}
          setApplicationStatus={setApplicationStatus}
        />
      ) : null}
    </>
  );
};

export default createRefetchContainer(
  ApplicationStatusContainer,
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
