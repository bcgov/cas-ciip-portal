import React from 'react';
import {withA11y} from '@storybook/addon-a11y';
import {Table} from 'react-bootstrap';
import ApplicationRowItemContainer from '../../../containers/Applications/ApplicationRowItemContainer';

export default {
  title: 'Application Row Item',
  component: ApplicationRowItemContainer,
  decorators: [withA11y]
};
const application = {
  applicationId: 1,
  applicationStatus: 'pending',
  submissionDate: 'August 1',
  facilityName: 'The Wonderful Facility of Oz',
  operatorName: 'Emerald City Inc',
  reportingYear: '1939',
  bcghgid: '123456789'
};
export const normal = () => (
  <Table striped bordered hover style={{textAlign: 'center'}}>
    <thead>
      <tr>
        <th>Application ID</th>
        <th>Operator Name</th>
        <th>Facility Name</th>
        <th>Submitted</th>
        <th>Status</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <ApplicationRowItemContainer application={application} />
    </tbody>
  </Table>
);
normal.story = {
  name: 'default',
  decorators: [withA11y]
};
