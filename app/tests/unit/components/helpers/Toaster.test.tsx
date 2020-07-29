import React, {Component} from 'react';
import {mount} from 'enzyme';
import ToastHelper from 'components/helpers/Toaster';
import {act} from 'react-dom/test-utils';
import {graphql} from 'react-relay';
import BaseMutation from 'mutations/BaseMutation';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';

type fakeMutationVariables = {
  input: Record<string, unknown>;
};
type fakeMutationResponse = Record<string, unknown>;
type fakeMutationType = {
  readonly response: fakeMutationResponse;
  readonly variables: fakeMutationVariables;
};

/*
  Using createCiipUser to avoid having to create a dummy mutation in our production schema.
*/
const mutation = graphql`
  mutation ToasterMutation($input: CreateCiipUserInput!) {
    createCiipUser(input: $input) {
      ciipUser {
        emailAddress
      }
    }
  }
`;

const fakeMutation = async (
  environment: RelayModernEnvironment,
  variables: fakeMutationVariables
) => {
  return new BaseMutation<fakeMutationType>('fake-mutation').performMutation(
    environment,
    mutation,
    variables
  );
};

const {
  createMockEnvironment,
  MockPayloadGenerator
} = require('relay-test-utils');

const environment = createMockEnvironment();
jest.useFakeTimers();
const fakeInput = {
  input: {
    ciipUser: {
      emailAddress: 'test@test.com'
    }
  },
  messages: {
    success: 'Wohoo',
    failure: 'Oops!'
  }
};

const rejectToast = async () => {
  fakeMutation(environment, fakeInput);
  const operation = environment.mock.getMostRecentOperation();
  environment.mock.reject(operation, MockPayloadGenerator.generate(operation));
};

describe('Toaster', () => {
  jest.useFakeTimers();

  it('correctly renders a failure notification when a failure notification is defined', () => {
    class App extends Component {
      render() {
        return (
          <div>
            <ToastHelper />
          </div>
        );
      }
    }
    const wrapper = mount(<App />);
    rejectToast();
    act(() => jest.advanceTimersByTime(1000));
    wrapper.update();
    expect(wrapper.find('.Toastify__toast-body').text()).toContain('Oops!');
    wrapper.unmount();
  });
});
