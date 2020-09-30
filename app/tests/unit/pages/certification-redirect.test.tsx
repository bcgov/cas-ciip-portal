import React from 'react';
import {shallow} from 'enzyme';
import CertificationRedirect from 'pages/certifier/certification-redirect';
import {certificationRedirectQueryResponse} from 'certificationRedirectQuery.graphql';

const query: certificationRedirectQueryResponse['query'] = {
  session: {
    ciipUserBySub: {
      id: 'sjkdfh'
    },
    ' $fragmentRefs': {
      defaultLayout_session: true
    }
  },
  certificationUrlByRowId: {
    id: 'sjkdhf',
    rowId: 'lsdjf',
    expiresAt: '2120-06-02 11:20:24.934381-07',
    ciipUserByCreatedBy: {
      firstName: 'Old',
      lastName: 'MacDonald'
    },
    applicationByApplicationId: {
      id: 'kdfbo',
      latestDraftRevision: {
        versionNumber: 1
      },
      facilityByFacilityId: {
        facilityName: 'Farm',
        organisationByOrganisationId: {
          operatorName: "MacDonald's Agriculture Ltd."
        }
      }
    }
  }
};

describe('Login redirect page', () => {
  it('matches the last accepted Snapshot', () => {
    const wrapper = shallow(
      <CertificationRedirect query={query} router={null} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
