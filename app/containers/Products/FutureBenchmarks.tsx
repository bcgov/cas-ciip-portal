import React from 'react';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {Button} from 'react-bootstrap';
import updateBenchmarkMutation from 'mutations/benchmark/updateBenchmarkMutation';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  benchmark: any;
  environment: RelayModernEnvironment;
  handleDeleteBenchmark: (benchmark: any) => void;
  benchmarkSchema;
  benchmarkUISchema;
}

const FutureBenchmarksComponent: React.FunctionComponent<Props> = ({
  benchmark,
  environment,
  handleDeleteBenchmark,
  benchmarkSchema,
  benchmarkUISchema
}) => {
  const updateBenchmark = async (e: IChangeEvent) => {
    const variables = {
      input: {
        id: benchmark.id,
        benchmarkPatch: {
          ...e.formData
        }
      }
    };
    const response = await updateBenchmarkMutation(environment, variables);
    console.log(response);
  };

  return (
    <>
      <JsonSchemaForm
        omitExtraData
        liveOmit
        schema={benchmarkSchema}
        uiSchema={benchmarkUISchema}
        formData={benchmark}
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
