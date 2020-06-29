import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {Dropdown} from 'react-bootstrap';

export const FacilityComponent = (props) => {
  const {facility} = props;
  if (!facility) {
    return null;
  }

  let {facilityName} = facility;

  if (!facility.facilityName)
    facilityName = `empty name (swrs facility id = ${facility.swrsFacilityId})`;
  if (!facilityName.toLowerCase().includes(props.facilityInput.toLowerCase()))
    return null;

  return (
    <Dropdown.Item
      onSelect={() =>
        props.selectFacility(
          facilityName,
          facility.rowId,
          facility.organisationByOrganisationId.operatorName,
          facility.facilityType,
          facility.bcghgid,
          facility.swrsReportId
        )
      }
    >
      {facilityName}
    </Dropdown.Item>
  );
};

export default createFragmentContainer(FacilityComponent, {
  facility: graphql`
    fragment Facility_facility on Facility {
      rowId
      facilityName
      organisationByOrganisationId {
        operatorName
      }
      facilityType
      bcghgid
      swrsReportId
      swrsFacilityId
    }
  `
});
