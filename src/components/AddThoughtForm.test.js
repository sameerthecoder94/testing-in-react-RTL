// This library is imported to enable async/await keywords in the Codecademy Code Editor
// import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';

// This library is imported to mimic user interactions (which you'll learn about next!)
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';

test('"Oreos are delicious" should not appear', () => {
  render(<App />);
  // Add testing logic here
  const emptyThought = screen.queryByText('Oreos are delicious');
  expect(emptyThought).toBeNull();
});

test('Should show new thought to be present', async () => {
  render(<App />);

  // The code below mimics a user posting a thought with text 'Oreos are delicious'
  const addThoughtInput = screen.getByRole('input');
  const addButton = screen.getByRole('submit');
  userEvent.type(addThoughtInput, 'Oreos are delicious');
  userEvent.click(addButton);

  // Modify testing logic here
  const thoughtOnScreen = await screen.findByText('Oreos are delicious');
  expect(thoughtOnScreen).toBeInTheDocument();
});
