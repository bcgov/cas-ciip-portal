import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// import '../node_modules/bootstrap/dist/css/bootstrap.css'

addDecorator(withInfo);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx?$/), module);
