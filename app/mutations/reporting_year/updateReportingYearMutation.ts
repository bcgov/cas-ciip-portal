import {graphql} from 'react-relay';
import {
  updateReportingYearMutation as updateReportingYearMutationType,
  updateReportingYearMutationVariables
} from '__generated__/updateReportingYearMutation.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import BaseMutation from 'mutations/BaseMutation';

const mutation = graphql`
  mutation updateReportingYearMutation($input: UpdateReportingYearInput!) {
    updateReportingYear(input: $input) {
      reportingYear {
        applicationOpenTime
        applicationCloseTime
        applicationResponseTime
      }
      clientMutationId
    }
  }
`;

const updateReportingYearMutation = async (
  environment: RelayModernEnvironment,
  variables: updateReportingYearMutationVariables
) => {
  // Optimistic response
  const payload = {
    updateReportingYear: {
      reportingYear: {
        id: variables.input.id,
        ...variables.input.reportingYearPatch
      }
    }
  };

  return new BaseMutation<updateReportingYearMutationType>(
    'update-reporting-year-mutation'
  ).performMutation(environment, mutation, variables, payload);
};

export default updateReportingYearMutation;
