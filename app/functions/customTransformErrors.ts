import {AjvError} from 'react-jsonschema-form';
import {FormJson} from 'next-env';

export const customTransformErrors = (
  errors: AjvError[],
  formJson: FormJson
) => {
  const {customFormatsErrorMessages = {}} = formJson;
  // Ignore oneOf errors https://github.com/rjsf-team/react-jsonschema-form/issues/1263
  return errors
    .filter((error) => error.name !== 'oneOf')
    .map((error) => {
      if (error.name !== 'format') return error;
      if (!customFormatsErrorMessages[error.params.format]) return error;
      return {
        ...error,
        message: customFormatsErrorMessages[error.params.format]
      };
    });
};
