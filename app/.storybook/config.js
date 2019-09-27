import { configure } from '@storybook/react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

configure(require.context('../tests', true, /\.stories\.js$/), module);
