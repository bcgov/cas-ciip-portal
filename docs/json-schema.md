# Usage of JSON schemas in the CIIP portal

This application's source code relies extensively on the [JSON Schema specification] to define the shape and validation of the data that is part of a CIIP application.

## Rendering of the data using @rjsf/core

In order to display the data to the user, either when displaying the forms where industry reporter input their data, or when rendering the contents of a CIIP application in a table, we rely on the [@rjsf/core] project.

TODO: explain format of objects ({schema, uiSchema, customFormats, customErrors})

### TODO: support of formulas in forms

[json schema specification]: https://json-schema.org/
[@rjsf/core]: https://github.com/rjsf-team/@rjsf/core
