import React from "react";
import { shallow } from "enzyme";

import JsonSchemaForm from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import DatePickerWidget from "components/Forms/DatePickerWidget";
import FormObjectFieldTemplate from "containers/Forms/FormObjectFieldTemplate";
import FormFieldTemplate from "containers/Forms/FormFieldTemplate";

describe("DatePickerWidget", () => {
  it("Should match last accepted snapshot: DatePickerWidget", async () => {
    const schema = {
      applicationOpenTime: {
        title: "Application Open Time",
        type: "string",
      },
    };
    const uiSchema = {
      applicationOpenTime: {
        "ui:widget": "DatePickerWidget",
      },
    };
    const r = shallow(
      <JsonSchemaForm
        omitExtraData
        liveOmit
        noHtml5Validate
        schema={schema as JSONSchema7}
        uiSchema={uiSchema}
        formData={{}}
        FieldTemplate={FormFieldTemplate}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        widgets={{ DatePickerWidget }}
        showErrorList={false}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
