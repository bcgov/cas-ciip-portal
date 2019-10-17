import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Card, Accordion } from 'react-bootstrap';

const FacilitiesFragment = (props) => {
    return (<Accordion.Collapse eventKey={props.facility.organisationId}><Card.Body data-testid="card" style={{ borderBottom: '1px solid #d3d3d3' }}>
        <div style={{ fontWeight: 'bold' }}>
            {props.facility.facilityName}

            <Button variant="primary" style={{ marginLeft: '30px' }}>
                Apply for CIIP for this facility
      </Button>
        </div>
        <p style={{ marginTop: '10px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
    </p>
    </Card.Body></Accordion.Collapse>);
}

// export default FacilitiesFragment;
export default createFragmentContainer(FacilitiesFragment, {
    facility: graphql`
    fragment FacilitiesFragment_facility on Facility{
        id
        rowId
        organisationId
        facilityName
    }`
});