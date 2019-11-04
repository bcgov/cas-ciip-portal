// Enzyme setup file
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
import {queryMock} from './relayQueryMock';

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
// @ts-ignore
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

// Define globals to cut down on imports in test files
// global.React = React;
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;
// global.sinon = sinon;

jest.setTimeout(30000);

beforeEach(() => {
  /**
   * This runs before each test.
   * We reset all mocked queries and calls.
   * We clean up mounted things from react-testing-library.
   */

  queryMock.setup('http://localhost:3004/graphql'); // Initialize our queryMock for each test suite
});

/**
 * Jest has no fetch implementation by default. We make sure fetch exists in our tests by using node-fetch here. */
// global.fetch = require('node-fetch');
