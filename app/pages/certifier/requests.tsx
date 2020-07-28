import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {CiipPageComponentProps} from 'next-env';
import {requestsQueryResponse} from 'requestsQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import {USER} from 'data/group-constants';
import SearchTable from 'components/SearchTable';
import CertificationRequestsContainer from 'containers/Certifier/CertificationRequestsContainer';
import SignatureDisclaimerCard from 'components/SignatureDisclaimerCard';
import CertificationSignature from 'containers/Forms/CertificationSignature';
import SupportedBrowserNotice from 'components/SupportedBrowserNotice';

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: requestsQueryResponse['query'];
  router: NextRouter;
}

export default class CertifierRequests extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query requestsQuery(
      $searchField: [String]
      $searchValue: [String]
      $orderByField: String
      $direction: String
      $offsetValue: Int
      $maxResultsPerPage: Int
    ) {
      query {
        session {
          ...defaultLayout_session
        }
        ...CertificationRequestsContainer_query
          @arguments(
            searchField: $searchField
            searchValue: $searchValue
            orderByField: $orderByField
            direction: $direction
            offsetValue: $offsetValue
            maxResultsPerPage: $maxResultsPerPage
          )
      }
    }
  `;

  state = {selectedRequests: [], forceRefetch: 0};

  constructor(props) {
    super(props);
    this.updateSelections = this.updateSelections.bind(this);
    this.resetSelectionsAfterSubmission = this.resetSelectionsAfterSubmission.bind(
      this
    );
  }

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'facility_name',
        direction: 'ASC',
        offsetValue: 0,
        maxResultsPerPage: 20
      }
    };
  }

  resetSelectionsAfterSubmission() {
    this.setState((prev: any) => {
      return {
        ...prev,
        forceRefetch: Number(prev.forceRefetch) + 1,
        selectedRequests: []
      };
    });
  }

  updateSelections(selectedRequests) {
    this.setState((prev) => {
      return {
        ...prev,
        selectedRequests
      };
    });
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout title="Certification Requests" session={query.session}>
        <SupportedBrowserNotice />
        <SearchTable
          query={this.props.query}
          defaultOrderByField="facility_name"
          defaultOrderByDisplay="Facility"
        >
          {(props) => (
            <CertificationRequestsContainer
              selections={this.state.selectedRequests}
              forceRefetch={this.state.forceRefetch}
              notifySelections={this.updateSelections}
              {...props}
            />
          )}
        </SearchTable>
        {this.state.selectedRequests.length > 0 && (
          <>
            <SignatureDisclaimerCard>
              Please review the information below before approving all the
              applications selected above.{' '}
              <a href="/resources/application-disclaimer" target="_blank">
                (<FontAwesomeIcon icon={faExternalLinkAlt} />
                expand)
              </a>
            </SignatureDisclaimerCard>
            <CertificationSignature
              certificationIdsToSign={this.state.selectedRequests}
              reportSubmissions={this.resetSelectionsAfterSubmission}
            />
          </>
        )}
      </DefaultLayout>
    );
  }
}
