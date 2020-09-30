import jsf from 'json-schema-faker';
import {FormJson} from 'next-env';

const generateFakeSchemaData = (formJson: FormJson) => {
  jsf.option({alwaysFakeOptionals: true});
  jsf.option({random: Math.random}); // Use the mocked random
  if (formJson.customFormats) {
    for (const [formatName, format] of Object.entries(formJson.customFormats)) {
      jsf.format(formatName, () => jsf.random.randexp(format));
    }
  }

  return jsf.generate(formJson.schema);
};

export {generateFakeSchemaData};
