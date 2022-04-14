import { Thought } from './Thought';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('Should have header text Passing Thoughts', () => {
  render(<App />);
  // Test App header text here
  const header = screen.getByText('Passing Thoughts');
  expect(header).toHaveTextContent('Passing Thoughts');
});

test('Should have button enabled', () => {
  render(<Thought thought={{ text: 'Hello' }} removeThought={() => {}} />);
  // Test status of button here
  const button = screen.getByRole('button');
  expect(button).toBeEnabled();
});
