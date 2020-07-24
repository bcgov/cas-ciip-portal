import JsonSchemaForm from 'react-jsonschema-form';
import {toErrorList} from 'react-jsonschema-form/lib/validate';
/**
 * Extends the Form class from 'react-jsonchema-form'
 * to enable validation on blur for all fields
 */
export default class Form<T> extends JsonSchemaForm<T> {
  constructor(props) {
    super(props);
    const superOnBlur = this.onBlur;

    this.onBlur = (id, value) => {
      // Id is 'root_path_to_field'
      const fieldPath = id.split('_');
      // Error schema is an object whose shape matches the form data
      const {formData, errorSchema} = this.state as any;
      const {errorSchema: newErrorSchema} = this.validate(formData);

      // We only want to retrieve the errors for the blurred field in newErrorSchema
      // as this.validate will validate all fields
      let blurredFieldErrorSchema = newErrorSchema;
      for (let i = 1; i < fieldPath.length; i++) {
        blurredFieldErrorSchema = blurredFieldErrorSchema[fieldPath[i]];
      }

      // Although we only want to add the errors from the blurred field,
      // we still want to keep the errors from previously blurred fields
      const mergedErrorSchema = {...errorSchema};

      // Find the object that will contain blurredFieldErrorSchema
      let blurredFieldParentSchema = mergedErrorSchema;
      for (let i = 1; i < fieldPath.length - 1; i++) {
        if (blurredFieldParentSchema[fieldPath[i]] === undefined)
          blurredFieldParentSchema[fieldPath[i]] = {};

        // Make a copy of the part of the error schema that was blurred.
        // This ensures immutability of the error schema, and proper re-rendering of the form
        blurredFieldParentSchema[fieldPath[i]] = {
          ...blurredFieldParentSchema[fieldPath[i]]
        };

        // Go one level down in the error schema tree
        blurredFieldParentSchema = blurredFieldParentSchema[fieldPath[i]];
      }

      blurredFieldParentSchema[
        fieldPath[fieldPath.length - 1]
      ] = blurredFieldErrorSchema;

      this.setState(
        {
          errors: toErrorList(mergedErrorSchema),
          errorSchema: mergedErrorSchema
        },
        () => {
          superOnBlur(id, value);
        }
      );
    };
  }
}
