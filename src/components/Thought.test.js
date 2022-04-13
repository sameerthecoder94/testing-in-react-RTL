import { Thought } from './Thought';

// import render and screen here
import { render, screen } from '@testing-library/react';

test('Display the Thought component', () => {
  // Pass to Thought component as thought prop
  const thought = { text: 'learn react testing library' };
  // Add your testing logic here
  render(<Thought thought={thought} removeThought={() => {}} />);

  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});
