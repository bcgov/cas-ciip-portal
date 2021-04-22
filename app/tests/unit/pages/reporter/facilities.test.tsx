import React from 'react';
import FacilitiesList from 'pages/reporter/facilities';
import {shallow} from 'enzyme';
import {facilitiesQueryResponse} from '__generated__/facilitiesQuery.graphql';

describe('The reporter facilities list page', () => {
  it('matches the snapshot', () => {
    const query: facilitiesQueryResponse['query'] = {
      session: {' $fragmentRefs': {defaultLayout_session: true}},
      ' $fragmentRefs': {FacilitiesListContainer_query: true}
    };

    const pageUnderTest = shallow(
      <FacilitiesList router={null} query={query} />
    );
    expect(pageUnderTest).toMatchSnapshot();
  });
});
