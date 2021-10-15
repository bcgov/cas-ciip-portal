import React from "react";
import ProgressStepIndicator from "components/ProgressStepIndicator";
import StatusBadgeColor from "components/helpers/StatusBadgeColor";

interface Props {
  title: string;
  ariaLabel?: string; // used if the indicator does not have a title.
  completed?: number;
}

const ciipAppSteps = [
  {
    description: "CIIP Application not started",
    badgeStyle: StatusBadgeColor.NONE,
    number: 1,
  },
  {
    description: "Application in progress",
    badgeStyle: StatusBadgeColor.INITIAL,
    number: 2,
  },
  {
    description: "Application submitted and in review",
    badgeStyle: StatusBadgeColor.PENDING,
    number: 3,
  },
  {
    description: "Application approved or rejected",
    badgeStyle: StatusBadgeColor.APPROVED,
    number: 4,
  },
];

export const ApplicationProgressBar: React.FunctionComponent<Props> = ({
  completed = 0,
  ...props
}) => {
  const completedSteps = ciipAppSteps.map((step, i) => {
    return completed > i ? { ...step, completed: true } : step;
  });
  return <ProgressStepIndicator steps={completedSteps} {...props} />;
};

export default ApplicationProgressBar;
