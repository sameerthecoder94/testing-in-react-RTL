import { render, screen } from '@testing-library/react';
import App from './App';

test('should prints out the contents of the DOM', () => {
  render(<App />);
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
});
