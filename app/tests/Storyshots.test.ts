import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

// Runner
initStoryshots({
  asyncJest: true, // This is the option that activates the async behaviour
  test: ({
    story,
    context,
    done // --> callback passed to test method when asyncJest option is true
  }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const storyElement = story.render();

    // Mount the story
    const tree = mount(storyElement);

    // Wait until the mount is updated, in our app mostly by Relay
    // but maybe something else updating the state of the component
    // somewhere
    const waitTime = 1;
    setTimeout(() => {
      if (snapshotFilename) {
        expect(toJson(tree.update())).toMatchSpecificSnapshot(snapshotFilename);
      }

      done();
    }, waitTime);
  }
  // Other options here
});
