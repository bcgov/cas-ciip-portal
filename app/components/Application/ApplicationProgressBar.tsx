import React from 'react';
import ProgressStepIndicator from 'components/ProgressStepIndicator';
import StatusBadgeColor from 'components/helpers/StatusBadgeColor';

interface Props {
  title: string;
  completed?: number;
}

const ciipAppSteps = [
  {
    description: 'CIIP Application not started',
    badgeStyle: StatusBadgeColor.NONE,
    number: 1
  },
  {
    description: 'Application in progress',
    badgeStyle: StatusBadgeColor.INITIAL,
    number: 2
  },
  {
    description: 'Application submitted and in review',
    badgeStyle: StatusBadgeColor.PENDING,
    number: 3
  },
  {
    description: 'Application approved or rejected',
    badgeStyle: StatusBadgeColor.APPROVED,
    number: 4
  }
];

export const ApplicationProgressBar: React.FunctionComponent<Props> = ({
  title,
  completed = 0
}) => {
  let steps = ciipAppSteps;
  if (completed > 0) {
    steps = steps.map((step, i) => {
      if (completed - 1 >= i) {
        return {...step, completed: true};
      }
      return step;
    });
  }
  return <ProgressStepIndicator title={title} steps={steps} />;
};

export default ApplicationProgressBar;
