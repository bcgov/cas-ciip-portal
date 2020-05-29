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

const ALLOWED_GROUPS = [USER];

interface Props extends CiipPageComponentProps {
  query: requestsQueryResponse['query'];
  router: NextRouter;
}

export default class CertifierRequests extends Component<Props> {
  static query = graphql`
    query requestsQuery(
      $searchField: [String]
      $searchValue: [String]
      $orderByField: String
      $direction: String
      $offsetValue: Int
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
          )
      }
    }
  `;

  state = {selectedRequests: []};

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  static async getInitialProps() {
    return {
      variables: {
        orderByField: 'facility_name',
        direction: 'ASC',
        offsetValue: 0
      }
    };
  }

  handleSelect(id, toBeSelected) {
    this.setState(({selectedRequests}: any) => {
      if (toBeSelected && !selectedRequests.includes(id)) {
        return {selectedRequests: selectedRequests.concat(id)};
      }

      if (!toBeSelected && selectedRequests.includes(id)) {
        const index = Number(selectedRequests.indexOf(id));
        const newArray = selectedRequests
          .slice(0, index)
          .concat(selectedRequests.slice(index + 1));
        return {selectedRequests: newArray};
      }
    });
  }

  handleSelectAll(selectAll, ids) {
    this.setState({
      selectedRequests: selectAll ? ids : []
    });
  }

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        title="Certification Requests"
        session={query.session}
        allowedGroups={ALLOWED_GROUPS}
      >
        <SearchTable
          query={this.props.query}
          defaultOrderByField="facility_name"
          defaultOrderByDisplay="Facility"
        >
          {(props) => (
            <CertificationRequestsContainer
              handleSelect={this.handleSelect}
              handleSelectAll={this.handleSelectAll}
              {...props}
            />
          )}
        </SearchTable>
        {this.state.selectedRequests.length > 0 && (
          <SignatureDisclaimerCard>
            Please review the information below before approving all the
            applications selected above.{' '}
            <a href="/resources/disclaimer" target="_blank">
              (<FontAwesomeIcon icon={faExternalLinkAlt} />
              expand)
            </a>
          </SignatureDisclaimerCard>
        )}
      </DefaultLayout>
    );
  }
}
