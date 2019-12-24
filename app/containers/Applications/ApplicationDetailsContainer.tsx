import React from 'react';
import {createFragmentContainer, graphql, RelayProp} from 'react-relay';
import {ApplicationDetailsContainer_query} from 'ApplicationDetailsContainer_query.graphql';
import {ApplicationDetailsContainer_application} from 'ApplicationDetailsContainer_application.graphql';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ApplicationDetailsPdf from 'containers/Applications/ApplicationDetailsPdf';
import ApplicationDetailsCardItem from './ApplicationDetailsCardItem';

/*
 * The ApplicationDetails renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */

interface Props {
  query: ApplicationDetailsContainer_query;
  application: ApplicationDetailsContainer_application;
  relay: RelayProp;
  review: boolean;
}

export const ApplicationDetailsComponent: React.FunctionComponent<Props> = props => {
  const formResults = props.application.orderedFormResults.edges;
  const previousFormResults = props.review
    ? props?.application?.previousSubmittedRevision
        ?.formResultsByApplicationIdAndVersionNumber?.edges
    : undefined;
  return (
    <div>
      {formResults.map(({node}) => (
        <ApplicationDetailsCardItem
          key={node.id}
          previousFormResults={previousFormResults}
          formResult={node}
          query={props.query.query}
        />
      ))}
      <div style={{textAlign: 'right', marginTop: 20}}>
        <PDFDownloadLink
          document={pdfDocument}
          fileName={pdfFilename}
          className="btn btn-primary"
        >
          {({loading}) =>
            loading ? 'Generating pdf...' : 'Download Application'
          }
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default createFragmentContainer(ApplicationDetailsComponent, {
  query: graphql`
    fragment ApplicationDetailsContainer_query on Query {
      query {
        ...ApplicationDetailsCardItem_query
      }
    }
  `,
  application: graphql`
    fragment ApplicationDetailsContainer_application on Application
      @argumentDefinitions(version: {type: "String!"}) {
      id
      orderedFormResults(versionNumberInput: $version) {
        edges {
          node {
            id
            ...ApplicationDetailsCardItem_formResult
          }
        }
      }
      previousSubmittedRevision {
        formResultsByApplicationIdAndVersionNumber {
          edges {
            node {
              formJsonByFormId {
                slug
              }
              formResult
            }
          }
        }
      }
    }
  `
});
