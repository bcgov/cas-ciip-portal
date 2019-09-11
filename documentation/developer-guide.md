# Developer Guidelines

## Code style and Linting

We use [XO](https://github.com/xojs/xo) to lint the app's code. The following yarn scripts can be used to trigger formatting and linting:

 - `yarn lint`: Runs xo and prints all the errors and warnings
 - `yarn format`: Same as above, but also reformats the code using Prettier

### VSCode plugin

The `linter-xo-2` VSCode add XO support. The following VSCode settings will enable XO and make sure you code is properly formatted whenever you save a file:

```json
{
    "xo.enable": true,
    "xo.format.enable": true,
    "editor.formatOnSave": true
}
```
