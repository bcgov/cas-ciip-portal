import {graphql} from 'react-relay';
import {
  createReportingYearMutation as createReportingYearMutationType,
  createReportingYearMutationVariables
} from 'createReportingYearMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation createReportingYearMutation($input: CreateReportingYearInput!) {
    createReportingYear(input: $input) {
      reportingYear {
        reportingYear
        reportingPeriodStart
        reportingPeriodEnd
        applicationOpenTime
        applicationCloseTime
        applicationResponseTime
      }
      query {
        allReportingYears(orderBy: REPORTING_YEAR_DESC) {
          edges {
            node {
              id
              reportingYear
              reportingPeriodStart
              reportingPeriodEnd
              applicationOpenTime
              applicationCloseTime
              applicationResponseTime
            }
          }
        }
      }
    }
  }
`;

const createReportingYearMutation = async (
  environment: RelayModernEnvironment,
  variables: createReportingYearMutationVariables
) => {
  return new BaseMutation<createReportingYearMutationType>(
    'create-reporting-year-mutation'
  ).performMutation(environment, mutation, variables);
};

export default createReportingYearMutation;
