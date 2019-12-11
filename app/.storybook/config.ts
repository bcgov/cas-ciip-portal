import {configure, addDecorator, addParameters} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {withCssResources} from '@storybook/addon-cssresources';
import requireContext from 'require-context.macro';

addDecorator(withInfo);
addDecorator(withCssResources);
addParameters({
  cssresources: [
    {
      id: 'bootstrap',
      code:
        '<link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"></link>',
      picked: true
    }
  ]
});

// Automatically import all files ending in *.stories.js
configure(requireContext('../stories', true, /\.stories\.tsx?$/), module);
