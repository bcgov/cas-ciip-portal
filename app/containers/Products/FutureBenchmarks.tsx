import React from 'react';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {Button, Container} from 'react-bootstrap';
import moment from 'moment';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

import editBenchmarkMutation from '../../mutations/benchmark/editBenchmarkMutation';
import {
  benchmarkSchema,
  benchmarkUISchema
} from './ProductBenchmarkJsonSchemas';

interface Props {
  benchmark: any;
  environment: RelayModernEnvironment;
  deleteBenchmark: (...args: any[]) => void;
}

const FutureBenchmarksComponent: React.FunctionComponent<Props> = ({
  benchmark,
  environment,
  deleteBenchmark
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
    startDate: moment(benchmark.startDate).format('DD-MM-YYYY'),
    endDate: moment(benchmark.endDate).format('DD-MM-YYYY')
  };

  return (
    <Container>
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
          onClick={async () => deleteBenchmark(benchmark)}
        >
          Delete
        </Button>
      </JsonSchemaForm>
      <hr />
    </Container>
  );
};

export default FutureBenchmarksComponent;
