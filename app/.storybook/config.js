import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const req = requireContext('../tests', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
