import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {addFacilityQueryResponse} from 'addFacilityQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import AddFacility from 'containers/Facilities/AddFacility';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: addFacilityQueryResponse['query'];
}
class AddFacilityPage extends Component<Props> {
  static query = graphql`
    query addFacilityQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...AddFacility_query
      }
    }
  `;

  state = {
    facilityInput: '',
    selectedFacility: null
  };

  handleInputChange = (event) => {
    this.setState({facilityInput: event});
  };

  handleFacilityChange = (facilityId) => {
    this.setState({selectedFacility: facilityId});
  };

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Add Facility"
        allowedGroups={ALLOWED_GROUPS}
      >
        <AddFacility
          query={query}
          facilityInput={this.state.facilityInput}
          selectedFacility={this.state.selectedFacility}
          handleInputChange={this.handleInputChange}
          handleFacilityChange={this.handleFacilityChange}
        />
      </DefaultLayout>
    );
  }
}

export default AddFacilityPage;
