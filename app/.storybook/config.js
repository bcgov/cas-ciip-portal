import { configure } from '@storybook/react';

configure(require.context('../tests', true, /\.stories\.js$/), module);
