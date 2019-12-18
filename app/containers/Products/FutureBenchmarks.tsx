import React from 'react';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {Button} from 'react-bootstrap';
import moment from 'moment-timezone';
import editBenchmarkMutation from 'mutations/benchmark/editBenchmarkMutation';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

import {
  benchmarkSchema,
  benchmarkUISchema
} from './ProductBenchmarkJsonSchemas';

interface Props {
  benchmark: any;
  environment: RelayModernEnvironment;
  handleDeleteBenchmark: (benchmark: any) => void;
}

const FutureBenchmarksComponent: React.FunctionComponent<Props> = ({
  benchmark,
  environment,
  handleDeleteBenchmark
}) => {
  const updateBenchmark = async (e: IChangeEvent) => {
    const variables = {
      input: {
        id: benchmark.id,
        benchmarkPatch: {
          benchmark: e.formData.benchmark,
          eligibilityThreshold: e.formData.eligibilityThreshold,
          startDate: e.formData.startDate,
          endDate: e.formData.endDate
        }
      }
    };
    const response = await editBenchmarkMutation(environment, variables);
    console.log(response);
  };

  const formData = {
    benchmark: benchmark.benchmark,
    eligibilityThreshold: benchmark.eligibilityThreshold,
    startDate: moment
      .tz(benchmark.startDate, 'America/Los_Angeles')
      .format('DD-MM-YYYY'),
    endDate: moment
      .tz(benchmark.endDate, 'America/Los_Angeles')
      .format('DD-MM-YYYY')
  };

  return (
    <>
      <JsonSchemaForm
        omitExtraData
        liveOmit
        schema={benchmarkSchema}
        uiSchema={benchmarkUISchema}
        formData={formData}
        showErrorList={false}
        FieldTemplate={FormFieldTemplate}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        onSubmit={updateBenchmark}
      >
        <Button type="submit">Save</Button>
        <Button
          variant="danger"
          onClick={async () => handleDeleteBenchmark(benchmark)}
        >
          Delete
        </Button>
      </JsonSchemaForm>
      <hr />
    </>
  );
};

export default FutureBenchmarksComponent;
