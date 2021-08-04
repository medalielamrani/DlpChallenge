import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../components/screen/HomeScreen';

test('renders correctly', async () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
