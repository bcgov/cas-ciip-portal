import React from 'react';
import {shallow} from 'enzyme';
import {ApplicationDetailsComponent} from 'containers/Applications/ApplicationDetailsContainer';

describe('ApplicationDetailsComponent', () => {
  it('should match the snapshot with the ApplicationDetails component', async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        isAnalyst
        relay={null}
        query={{
          ' $refType': 'ApplicationDetailsContainer_query',
          query: null
        }}
        application={{
          ' $refType': 'ApplicationDetailsContainer_application',
          id: 'abc',
          formResultsByApplicationId: {
            edges: [
              {
                node: {
                  id: 'WyJmb3JtX3Jlc3VsdHMiLDExXQ==',
                  ' $fragmentRefs': {
                    ApplicationDetailsCardItem_formResult: true
                  }
                }
              }
            ]
          }
        }}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
});
