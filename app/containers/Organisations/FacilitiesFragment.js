import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Card, Accordion, Button} from 'react-bootstrap';

const FacilitiesFragment = props => {
  return (
    <Accordion.Collapse eventKey={props.facility.organisationId}>
      <Card.Body data-testid="card" style={{borderBottom: '1px solid #d3d3d3'}}>
        <div style={{fontWeight: 'bold'}}>
          {props.facility.facilityName}

          <Button variant="primary" style={{marginLeft: '30px'}}>
            Apply for CIIP
          </Button>
        </div>
      </Card.Body>
    </Accordion.Collapse>
  );
};

// Export default FacilitiesFragment;
export default createFragmentContainer(FacilitiesFragment, {
  facility: graphql`
    fragment FacilitiesFragment_facility on Facility {
      id
      rowId
      organisationId
      facilityName
    }
  `
});
