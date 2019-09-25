import React from 'react';
import {withA11y} from '@storybook/addon-a11y';
import ApplicationRowItem from '../../../components/Applications/ApplicationRowItem';

export default {
  title: 'Application Row Item',
  component: ApplicationRowItem,
  decorators: [withA11y]
};
const application = {
  applicationStatus: 'pending',
  submissionDate: 'August 1',
  facilityName: 'The Wonderful Facility of Oz',
  operatorName: 'Emerald City Inc',
  reportingYear: '1939',
  bcghgid: '123456789'
};
export const normal = () => <ApplicationRowItem application={application} />;
normal.story = {
  name: 'default',
  decorators: [withA11y]
};
