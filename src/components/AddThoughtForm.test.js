import App from '../App.js';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent here
import userEvent from '@testing-library/user-event';

test('Clicking the x button should remove a thought', () => {
  render(<App />);

  // Since there are multiple '×' buttons, we are using the .getAllByText() method which returns an array. We are then extracting the first button from the array which belongs to the Thought with text 'This is a place for your passing thoughts.'
  const button = screen.getAllByText('x')[0];

  // TODO: Mimic clicking on the button
  userEvent.click(button);

  // We grab the thought again. It should be null after we clicked the '×' button using userEvent.
  const removedThought = screen.queryByText(
    'This is a place for your passing thoughts.'
  );
  expect(removedThought).toBeNull();
});

test('Should add a new thought', () => {
  render(<App />);
  // Grab the text box and the submit button.
  const input = screen.getByRole('textbox');
  const submit = screen.getByText('Add');

  // TODO: Add testing logic to simulate user interactions here
  userEvent.type(input, 'Did I forget my keys?');
  userEvent.click(submit);

  // Assert that the thought appears
  const thought = screen.getByText('Did I forget my keys?');
  expect(thought).toBeInTheDocument();
});

// // This library is imported to enable async/await keywords in the Codecademy Code Editor
// // import 'regenerator-runtime/runtime';
// import { render, screen } from '@testing-library/react';

// // This library is imported to mimic user interactions (which you'll learn about next!)
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import App from '../App';

// test('"Oreos are delicious" should not appear', () => {
//   render(<App />);
//   // Add testing logic here
//   const emptyThought = screen.queryByText('Oreos are delicious');
//   expect(emptyThought).toBeNull();
// });

// test('Should show new thought to be present', async () => {
//   render(<App />);

//   // The code below mimics a user posting a thought with text 'Oreos are delicious'
//   const addThoughtInput = screen.getByRole('input');
//   const addButton = screen.getByRole('submit');
//   userEvent.type(addThoughtInput, 'Oreos are delicious');
//   userEvent.click(addButton);

//   // Modify testing logic here
//   const thoughtOnScreen = await screen.findByText('Oreos are delicious');
//   expect(thoughtOnScreen).toBeInTheDocument();
// });
