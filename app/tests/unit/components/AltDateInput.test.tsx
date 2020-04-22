import React from 'react';
import {shallow} from 'enzyme';

import JsonSchemaForm from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import AltDateInput from 'components/Forms/AltDateInput';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';

describe('AltDateInput', () => {
  it('Should match last accepted snapshot: AltDate (date only)', async () => {
    const schema = {
      applicationOpenTime: {
        title: 'Application Open Time',
        type: 'string'
      }
    };
    const uiSchema = {
      applicationOpenTime: {
        'ui:widget': 'AltDateInput',
        'ui:options': {
          hideNowButton: true,
          hideClearButton: true
        }
      }
    };
    const r = shallow(
      <JsonSchemaForm
        omitExtraData
        liveOmit
        noHtml5Validate
        schema={schema as JSONSchema6}
        uiSchema={uiSchema}
        formData={{}}
        FieldTemplate={FormFieldTemplate}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        widgets={{AltDateInput}}
        showErrorList={false}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
