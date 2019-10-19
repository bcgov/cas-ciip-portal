import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Button} from 'react-bootstrap';

export const FacilityComponent = props => {
  return (
    <div style={{fontWeight: 'bold'}}>
      {props.facility.facilityName}

      <Button variant="primary" style={{marginLeft: '30px'}}>
        Apply for CIIP
      </Button>
    </div>
  );
};

// Export default FacilitiesFragment;
export default createFragmentContainer(FacilityComponent, {
  facility: graphql`
    fragment Facility_facility on Facility {
      facilityName
    }
  `
});
