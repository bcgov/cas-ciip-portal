import jsf from "json-schema-faker";
import { FormJson } from "next-env";
import { getDefaultRegistry, IdSchema } from "@rjsf/core/dist/cjs/utils";

const generateFakeSchemaData = (formJson: FormJson) => {
  jsf.option({ alwaysFakeOptionals: true });
  jsf.option({ random: Math.random }); // Use the mocked random
  if (formJson.customFormats) {
    for (const [formatName, format] of Object.entries(formJson.customFormats)) {
      jsf.format(formatName, () => jsf.random.randexp(format));
    }
  }

  return jsf.generate(formJson.schema);
};

const createDefaultJsonSchemaFormProps = () => {
  return {
    schema: {},
    uiSchema: {},
    idSchema: { $id: "myField" } as IdSchema<any>,
    formData: null,
    errorSchema: {},
    onChange: jest.fn(),
    onBlur: jest.fn(),
    registry: {
      ...getDefaultRegistry(),
    },
    formContext: {},
    autofocus: false,
    disabled: false,
    readonly: false,
    required: false,
    name: "",
  };
};

export { generateFakeSchemaData, createDefaultJsonSchemaFormProps };
