import {graphql} from 'react-relay';

export default graphql`
  query applicationDetailsQuery(
    $applicationStatusCondition: ApplicationStatusCondition
    $bcghgidInput: BigFloat
    $reportingYear: String
  ) {
    query {
      ...ApplicationStatusContainer_query
        @arguments(condition: $applicationStatusCondition)
      ...IncentiveCalculatorContainer_query
        @arguments(bcghgidInput: $bcghgidInput, reportingYear: $reportingYear)
    }
  }
`;
