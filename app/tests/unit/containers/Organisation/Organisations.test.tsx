import React from 'react';
import {shallow} from 'enzyme';
import {Organisations_query} from 'Organisations_query.graphql';
import {OrganisationsComponent} from 'containers/Organisations/Organisations';

const queryWithoutOrganisations: Organisations_query = {
  ' $refType': 'Organisations_query',
  session: {
    ciipUserBySub: {
      id: '',
      ciipUserOrganisationsByUserId: {edges: []}
    }
  },
  allOrganisations: {edges: []}
};

const queryWithOrganisations: Organisations_query = {
  ' $refType': 'Organisations_query',
  session: {
    ciipUserBySub: {
      id: '',
      ciipUserOrganisationsByUserId: {
        edges: [
          {
            node: {
              id: 'OrgId',
              ' $fragmentRefs': {UserOrganisation_userOrganisation: true}
            }
          }
        ]
      }
    }
  },
  allOrganisations: {
    edges: []
  }
};

describe('Organisations', () => {
  it('should render no organisations if the user has not requested any access', async () => {
    const r = shallow(
      <OrganisationsComponent
        query={queryWithoutOrganisations}
        relay={null}
        flagCertRequests={false}
        orgInput={null}
        selectedOrg={null}
        confirmOrg={null}
        handleInputChange={null}
        handleContextChange={null}
        handleOrgChange={null}
        handleOrgConfirm={null}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it("should render the user's requested organisations", async () => {
    const r = shallow(
      <OrganisationsComponent
        query={queryWithOrganisations}
        relay={null}
        flagCertRequests={false}
        orgInput={null}
        selectedOrg={null}
        confirmOrg={null}
        handleInputChange={null}
        handleContextChange={null}
        handleOrgChange={null}
        handleOrgConfirm={null}
      />
    );
    expect(r).toMatchSnapshot();
    expect(
      r.find('Relay(UserOrganisationComponent)').prop('userOrganisation')
    ).toBe(
      queryWithOrganisations.session.ciipUserBySub.ciipUserOrganisationsByUserId
        .edges[0].node
    );
  });

  it('should announce there are certification requests to view', async () => {
    const r = shallow(
      <OrganisationsComponent
        flagCertRequests
        query={queryWithOrganisations}
        relay={null}
        orgInput={null}
        selectedOrg={null}
        confirmOrg={null}
        handleInputChange={null}
        handleContextChange={null}
        handleOrgChange={null}
        handleOrgConfirm={null}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
