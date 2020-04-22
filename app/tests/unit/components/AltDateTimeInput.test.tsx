import React from 'react';
import {shallow} from 'enzyme';

import JsonSchemaForm from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import AltDateTimeInput from 'components/Forms/AltDateTimeInput';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';

describe('AltDateInput', () => {
  it('Should match last accepted snapshot: AltDateTime (both date and time)', async () => {
    const schema = {
      applicationOpenTime: {
        title: 'Application Open Time',
        type: 'string'
      }
    };
    const uiSchema = {
      applicationOpenTime: {
        'ui:widget': 'AltDateTimeInput',
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
        widgets={{AltDateTimeInput}}
        showErrorList={false}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
